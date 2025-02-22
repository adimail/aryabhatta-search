/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "@/server/actions/user";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "next-auth/react";

interface UserProfileProps {
  userid: string;
}

interface EditableUserInfo {
  name: string | null;
  email: string | null;
  dob: Date | null;
  educationalStatus: string | null;
  image: string | null;
}

const EDUCATIONAL_STATUS_OPTIONS = [
  { value: "High School", label: "High School" },
  { value: "Undergraduate", label: "Undergraduate" },
  { value: "Graduate", label: "Graduate" },
  { value: "Post-Graduate", label: "Post-Graduate" },
];

export function UserProfile({ userid }: UserProfileProps) {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<EditableUserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const isOwnProfile = session?.user?.id === userid;

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const user = await getUserProfile(userid);
      if (user) {
        setUserInfo({
          name: user.name,
          email: user.email,
          dob: user.dob,
          educationalStatus: user.educationalStatus,
          image: user.image,
        });
        if (user.dob) {
          setSelectedDate(new Date(user.dob));
        }
      }
    } catch (error) {
      console.error(error);
      setError("Failed to load user profile");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchUserData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile(userid, {
        ...userInfo!,
        dob: selectedDate ?? null,
      });
      setIsEditing(false);
      await fetchUserData();
    } catch (error) {
      console.error(error);
      setError("Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl rounded-lg bg-white p-6 shadow-md">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {userInfo?.image && (
        <Image
          src={userInfo?.image ?? ""}
          alt="User Profile"
          width={200}
          height={200}
          className="mx-auto rounded-full"
        />
      )}
      {isOwnProfile && (
        <div className="mx-auto my-10 flex w-full justify-center">
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      )}
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold">User Profile</h1>
        </div>
        <Separator className="my-2 w-full bg-gray-700" />

        <div className="space-y-6 pt-5">
          <div>
            <h2 className="text-sm font-medium text-gray-500">Name</h2>
            <p className="mt-1 text-lg">{userInfo?.name ?? "Not set"}</p>
          </div>

          <div>
            <h2 className="text-sm font-medium text-gray-500">Email</h2>
            <p className="mt-1 text-lg">{userInfo?.email ?? "Not set"}</p>
          </div>

          {/* Editable information */}
          <div>
            <h2 className="mb-2 text-sm font-medium text-gray-500">
              Date of Birth
            </h2>
            {isEditing && isOwnProfile ? (
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
              />
            ) : (
              <p className="mt-1 text-lg">
                {userInfo?.dob
                  ? new Date(userInfo.dob).toLocaleDateString()
                  : "Not set"}
              </p>
            )}
          </div>

          <div>
            <h2 className="mb-2 text-sm font-medium text-gray-500">
              Educational Status
            </h2>
            {isEditing && isOwnProfile ? (
              <Select
                value={userInfo?.educationalStatus ?? ""}
                onValueChange={(value) =>
                  setUserInfo({ ...userInfo!, educationalStatus: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your education level" />
                </SelectTrigger>
                <SelectContent>
                  {EDUCATIONAL_STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <p className="mt-1 text-lg">
                {userInfo?.educationalStatus ?? "Not set"}
              </p>
            )}
          </div>

          {isEditing && isOwnProfile && (
            <Button onClick={handleSubmit} className="w-full">
              Save Changes
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
