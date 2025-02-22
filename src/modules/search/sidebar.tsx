import {
  Search,
  History,
  Book,
  Newspaper,
  GraduationCap,
  FileText,
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

const navigationItems = [
  {
    title: "Search",
    url: "#",
    icon: Search,
    subItems: [
      {
        title: "Subjects",
        icon: Book,
        items: ["Mathematics", "Physics", "Chemistry", "Biology"],
      },
      {
        title: "Courses",
        icon: GraduationCap,
        items: ["Online Courses", "Certifications", "Workshops"],
      },
      {
        title: "Resources",
        icon: FileText,
        items: ["Articles", "Research Papers", "Study Materials"],
      },
      {
        title: "News",
        icon: Newspaper,
        items: ["Academic News", "Industry Updates", "Events"],
      },
    ],
  },
  {
    title: "History",
    url: "#",
    icon: History,
  },
];

export function AppSidebar({ query, summary }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="md:mt-32">
            {query}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <p>{summary ? summary.choices[0]?.message.content : ""}</p>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <Collapsible className="w-full">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton className="w-full">
                          <item.icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        {item.subItems.map((subItem) => (
                          <Collapsible
                            key={subItem.title}
                            className="ml-4 mt-2"
                          >
                            <CollapsibleTrigger asChild>
                              <SidebarMenuButton className="w-full">
                                <subItem.icon />
                                <span>{subItem.title}</span>
                              </SidebarMenuButton>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <ul className="ml-6 space-y-2 py-2">
                                {subItem.items.map((subItemContent) => (
                                  <li
                                    key={subItemContent}
                                    className="cursor-pointer text-sm text-gray-600 hover:text-gray-900"
                                  >
                                    {subItemContent}
                                  </li>
                                ))}
                              </ul>
                            </CollapsibleContent>
                          </Collapsible>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
