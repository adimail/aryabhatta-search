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
import { differenceInYears } from "date-fns";
import { Clock, Search, Trash2, XCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import type { SearchHistoryItem } from "@/types/search";
import { getSearchHistory } from "@/server/actions/search";
import { toast } from "sonner";

interface UserProfileProps {
  userid: string;
}

interface EditableUserInfo {
  name: string | null;
  email: string | null;
  dob: Date | null;
  age: number | null;
  educationalStatus: string | null;
  image: string | null;
}

const EDUCATIONAL_STATUS_OPTIONS = [
  { value: "Elementary School", label: "Elementary School" },
  { value: "Middle School", label: "Middle School" },
  { value: "High School", label: "High School" },
  { value: "College", label: "College" },
  { value: "University", label: "University" },
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
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    const fetchSearchHistory = async () => {
      if (isOwnProfile && session?.user?.id) {
        try {
          const history = await getSearchHistory(session.user.id);
          setSearchHistory(history);
        } catch (error) {
          console.error("Failed to fetch search history:", error);
        }
      }
    };

    void fetchSearchHistory();
  }, [isOwnProfile, session?.user?.id]);

  const calculateAge = (birthDate: Date): number => {
    return differenceInYears(new Date(), birthDate);
  };

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const user = await getUserProfile(userid);
      if (user) {
        const age = user.dob ? calculateAge(new Date(user.dob)) : null;
        setUserInfo({
          name: user.name,
          email: user.email,
          dob: user.dob,
          age,
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

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      const age = calculateAge(date);
      setUserInfo((prev) => ({
        ...prev!,
        dob: date,
        age,
      }));
    }
  };

  const deleteHistoryItem = async (searchId: string) => {
    try {
      const response = await fetch(`/api/history/${userid}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ searchId }),
      });

      if (!response.ok) throw new Error("Failed to delete");

      setSearchHistory(searchHistory.filter((item) => item.id !== searchId));
      toast.success("Search history item deleted");
    } catch (error) {
      console.error("Failed to delete history item:", error);
      toast.error("Failed to delete history item");
    }
  };

  const clearAllHistory = async () => {
    try {
      const response = await fetch(`/api/history/${userid}/clear`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to clear history");

      setSearchHistory([]);
      toast.success("Search history cleared");
    } catch (error) {
      console.error("Failed to clear history:", error);
      toast.error("Failed to clear search history");
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
    <div className="mx-auto max-w-7xl">
      {userInfo?.image && (
        <Image
          src={userInfo?.image ?? ""}
          alt="User Profile"
          width={200}
          height={200}
          className="mx-auto mb-10 rounded-full"
        />
      )}
      {isOwnProfile && (
        <div className="mx-auto mb-10 flex w-full justify-center">
          <Button
            onClick={() => setIsEditing(!isEditing)}
            variant={isEditing ? "outline" : "default"}
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </Button>
        </div>
      )}

      <div className="flex h-full w-full gap-4">
        <Card className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-md">
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

            <div>
              <h2 className="mb-2 text-sm font-medium text-gray-500">
                Date of Birth
              </h2>
              {isEditing && isOwnProfile ? (
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  className="rounded-md border"
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                />
              ) : (
                <div className="space-y-1">
                  <p className="mt-1 text-lg">
                    {userInfo?.dob
                      ? new Date(userInfo.dob).toLocaleDateString()
                      : "Not set"}
                  </p>
                  {userInfo?.age && (
                    <p className="text-sm text-gray-600">
                      Age: {userInfo.age} years
                    </p>
                  )}
                </div>
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
        </Card>

        {isOwnProfile && (
          <Card className="w-full max-w-2xl p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">Recent Searches</h2>
                <Clock className="h-5 w-5 text-gray-500" />
              </div>
              {searchHistory.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={clearAllHistory}
                  className="flex items-center gap-2"
                >
                  <XCircle className="h-4" />
                  Clear All
                </Button>
              )}
            </div>
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {searchHistory.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Search className="mb-4 h-12 w-12 text-gray-300" />
                    <p className="text-lg font-medium text-gray-600">
                      No search history yet
                    </p>
                    <p className="text-sm text-gray-500">
                      Your recent searches will appear here
                    </p>
                  </div>
                ) : (
                  searchHistory.map((item) => (
                    <div
                      key={item.id}
                      className="group flex items-center justify-between rounded-lg border border-gray-200 p-4 transition-all hover:border-blue-100 hover:bg-blue-50"
                    >
                      <div className="flex items-center gap-4">
                        <div className="rounded-full bg-blue-100 p-2 group-hover:bg-blue-200">
                          <Search className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.query}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(item.timestamp).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteHistoryItem(item.id)}
                          className="h-8 w-8 text-red-500 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <a
                          href={`/search/${encodeURIComponent(item.query)}`}
                          className="truncate rounded-full bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm transition-all hover:bg-blue-600 hover:text-white"
                        >
                          Search Again
                        </a>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </Card>
        )}
      </div>
    </div>
  );
}
