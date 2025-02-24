/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import parseJson, { JSONError } from "parse-json";
import {
  Book,
  ChevronDown,
  ChevronRight,
  GraduationCap,
  Newspaper,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AppSidebarProps {
  query: string;
  summary: any;
}

interface ParsedData {
  summary: string;
  Structure: Record<string, any> | any[];
}

const extractJson = (text: string): string => {
  const regex = /```(?:json)?\n([\s\S]*?)```/;
  const match = regex.exec(text);
  return match?.[1]?.trim() ?? text.trim();
};

const parseData = (jsonString: string): ParsedData | null => {
  try {
    const jsonToParse = extractJson(jsonString);
    const parsed = parseJson(jsonToParse) as unknown as ParsedData;
    return parsed;
  } catch (error) {
    if (error instanceof JSONError) {
      console.error("Invalid JSON:", error.message);
    }
    return null;
  }
};

const getIconForCategory = (category: string) => {
  const lowerCategory = category.toLowerCase();
  if (
    lowerCategory.includes("education") ||
    lowerCategory.includes("learning")
  ) {
    return GraduationCap;
  }
  if (lowerCategory.includes("article") || lowerCategory.includes("news")) {
    return Newspaper;
  }
  return Book;
};

export function AppSidebar({ query, summary }: AppSidebarProps) {
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);

  useEffect(() => {
    const jsonData = summary.choices[0]?.message.content ?? "";
    setParsedData(parseData(jsonData));
  }, [summary]);

  const handleItemClick = (category: string) => {
    const sectionId = `section-${category.toLowerCase().replace(/\s+/g, "-")}`;
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <Sidebar className="fixed left-0 top-0 h-screen w-64 border-r bg-gray-50 pt-32">
      <SidebarContent className="h-full">
        <SidebarGroup>
          <SidebarGroupLabel className="sticky top-0 z-10 px-4 py-0 text-lg font-semibold">
            {query}
          </SidebarGroupLabel>
          <ScrollArea className="h-[calc(100vh-4rem)]">
            <SidebarGroupContent className="p-2">
              <SidebarMenu>
                {parsedData?.Structure &&
                  (Array.isArray(parsedData.Structure)
                    ? parsedData.Structure.map((structureItem, idx) =>
                        Object.entries(structureItem).map(
                          ([category, items]) => {
                            const Icon = getIconForCategory(category);
                            return (
                              <SidebarMenuItem
                                key={`${idx}-${category}`}
                                className="mb-2"
                              >
                                <Collapsible className="w-full">
                                  <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                      onClick={() => handleItemClick(category)}
                                      className="h-fit w-full rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
                                    >
                                      <Icon className="h-6 w-6" />
                                      <span className="ml-2 text-sm font-medium">
                                        {category}
                                      </span>
                                      <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                    </SidebarMenuButton>
                                  </CollapsibleTrigger>
                                  <CollapsibleContent>
                                    <ul className="ml-4 space-y-2 py-2">
                                      {Array.isArray(items) &&
                                        items.map((item, index) => (
                                          <li
                                            key={index}
                                            onClick={() =>
                                              handleItemClick(category)
                                            }
                                            className="group flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                                          >
                                            <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                                            <span className="line-clamp-2">
                                              {item}
                                            </span>
                                          </li>
                                        ))}
                                    </ul>
                                  </CollapsibleContent>
                                </Collapsible>
                              </SidebarMenuItem>
                            );
                          },
                        ),
                      )
                    : Object.entries(parsedData.Structure).map(
                        ([category, items]) => {
                          const Icon = getIconForCategory(category);
                          return (
                            <SidebarMenuItem key={category} className="mb-2">
                              <Collapsible className="w-full">
                                <CollapsibleTrigger asChild>
                                  <SidebarMenuButton
                                    onClick={() => handleItemClick(category)}
                                    className="w-full rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
                                  >
                                    <Icon className="h-5 w-5" />
                                    <span className="ml-2 text-sm font-medium">
                                      {category}
                                    </span>
                                    <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                                  </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                  <ul className="ml-4 space-y-2 py-2">
                                    {Array.isArray(items) &&
                                      items.map((item, index) => (
                                        <li
                                          key={index}
                                          onClick={() =>
                                            handleItemClick(category)
                                          }
                                          className="group flex cursor-pointer items-center rounded-md px-2 py-1.5 text-sm text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900"
                                        >
                                          <ChevronRight className="mr-2 h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                                          <span className="line-clamp-2">
                                            {item}
                                          </span>
                                        </li>
                                      ))}
                                  </ul>
                                </CollapsibleContent>
                              </Collapsible>
                            </SidebarMenuItem>
                          );
                        },
                      ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </ScrollArea>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
