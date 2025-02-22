"use client";

import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "@/server/actions/user";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UserProfileProps {
  userid: string;
}

interface EditableUserInfo {
  name: string | null;
  email: string | null;
  dob: Date | null;
  educationalStatus: string | null;
}

const EDUCATIONAL_STATUS_OPTIONS = [
  { value: "High School", label: "High School" },
  { value: "Undergraduate", label: "Undergraduate" },
  { value: "Graduate", label: "Graduate" },
  { value: "Post-Graduate", label: "Post-Graduate" },
];

export function UserProfile({ userid }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<EditableUserInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    fetchUserData();
  }, [userid]);

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
        });
        if (user.dob) {
          setSelectedDate(new Date(user.dob));
        }
      }
    } catch (error) {
      setError("Failed to load user profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Only update dob and educationalStatus
      await updateUserProfile(userid, {
        ...userInfo!,
        dob: selectedDate ?? null,
      });
      setIsEditing(false);
      await fetchUserData();
    } catch (error) {
      setError("Failed to update profile");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <p className="text-center text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Profile</h1>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant={isEditing ? "outline" : "default"}
        >
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <div className="space-y-6">
        {/* Read-only information */}
        <div>
          <h2 className="text-sm font-medium text-gray-500">Name</h2>
          <p className="mt-1 text-lg">{userInfo?.name || "Not set"}</p>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500">Email</h2>
          <p className="mt-1 text-lg">{userInfo?.email || "Not set"}</p>
        </div>

        {/* Editable information */}
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-2">Date of Birth</h2>
          {isEditing ? (
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
              {userInfo?.dob ? new Date(userInfo.dob).toLocaleDateString() : "Not set"}
            </p>
          )}
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-2">Educational Status</h2>
          {isEditing ? (
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
            <p className="mt-1 text-lg">{userInfo?.educationalStatus || "Not set"}</p>
          )}
        </div>

        {isEditing && (
          <Button
            onClick={handleSubmit}
            className="w-full"
          >
            Save Changes
          </Button>
        )}
      </div>
    </div>
  );
}
