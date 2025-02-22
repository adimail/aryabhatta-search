"use client";

import { useState, useEffect } from 'react';
import parseJson, { JSONError } from 'parse-json';
import {
  Search,
  History,
  Book,
  ChevronDown,
  ChevronRight,
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

export function AppSidebar({ query, summary }: AppSidebarProps) {
  const [parsedData, setParsedData] = useState<ParsedData | null>(null);

  useEffect(() => {
    const jsonData = summary.choices[0]?.message.content ?? "";
    setParsedData(parseData(jsonData));
  }, [summary]);

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="md:mt-32">
            {query}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {parsedData?.Structure && (
                Array.isArray(parsedData.Structure) ? (
                  parsedData.Structure.map((structureItem, idx) => (
                    Object.entries(structureItem).map(([category, items]) => (
                      <SidebarMenuItem key={`${idx}-${category}`}>
                        <Collapsible className="w-full">
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton className="w-full">
                              <Book />
                              <span>{category}</span>
                              <ChevronDown className="ml-auto h-4 w-4" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <ul className="ml-6 space-y-2 py-2">
                              {Array.isArray(items) && items.map((item, index) => (
                                <li
                                  key={index}
                                  className="cursor-pointer text-sm text-gray-600 hover:text-gray-900"
                                >
                                  <ChevronRight className="mr-2 inline-block h-4 w-4" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </CollapsibleContent>
                        </Collapsible>
                      </SidebarMenuItem>
                    ))
                  ))
                ) : (
                  Object.entries(parsedData.Structure).map(([category, items]) => (
                    <SidebarMenuItem key={category}>
                      <Collapsible className="w-full">
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton className="w-full">
                            <Book />
                            <span>{category}</span>
                            <ChevronDown className="ml-auto h-4 w-4" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <ul className="ml-6 space-y-2 py-2">
                            {Array.isArray(items) && items.map((item, index) => (
                              <li
                                key={index}
                                className="cursor-pointer text-sm text-gray-600 hover:text-gray-900"
                              >
                                <ChevronRight className="mr-2 inline-block h-4 w-4" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </CollapsibleContent>
                      </Collapsible>
                    </SidebarMenuItem>
                  ))
                )
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
