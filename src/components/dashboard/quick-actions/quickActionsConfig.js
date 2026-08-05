import { 
  UserPlus, Users, Layers, LayoutList, Briefcase, PlusCircle, 
  CalendarPlus, Calendar, MessageSquarePlus, MessageSquare, 
  Settings, Globe, Building2 
} from "lucide-react";

export const quickActionsConfig = [
  // Members
  {
    id: "add_member",
    title: "Add Member",
    description: "Register a new member",
    icon: UserPlus,
    href: "/admin/members/new",
    category: "Members",
    color: "blue",
    roles: ["Super Admin", "Province Admin", "District Admin", "Committee Admin"]
  },
  {
    id: "view_members",
    title: "Members List",
    description: "View all members",
    icon: Users,
    href: "/admin/members",
    category: "Members",
    color: "blue",
    roles: ["Super Admin", "Province Admin", "District Admin", "Committee Admin"]
  },

  // Committees
  {
    id: "create_committee",
    title: "Create Committee",
    description: "Setup a new committee",
    icon: Layers,
    href: "/admin/committees/new",
    category: "Committees",
    color: "purple",
    roles: ["Super Admin", "Province Admin", "District Admin"]
  },
  {
    id: "view_committees",
    title: "Manage Committees",
    description: "View and edit committees",
    icon: LayoutList,
    href: "/admin/committees",
    category: "Committees",
    color: "purple",
    roles: ["Super Admin", "Province Admin", "District Admin", "Committee Admin"]
  },

  // Positions
  {
    id: "create_position",
    title: "Add Position",
    description: "Create a new position",
    icon: PlusCircle,
    href: "/admin/positions/new",
    category: "Positions",
    color: "orange",
    roles: ["Super Admin", "Province Admin"]
  },
  {
    id: "view_positions",
    title: "Positions List",
    description: "Manage existing positions",
    icon: Briefcase,
    href: "/admin/positions",
    category: "Positions",
    color: "orange",
    roles: ["Super Admin", "Province Admin"]
  },

  // Events
  {
    id: "create_event",
    title: "Create Event",
    description: "Schedule a new activity",
    icon: CalendarPlus,
    href: "/admin/events/new",
    category: "Events",
    color: "green",
    roles: ["Super Admin", "Province Admin", "District Admin", "Committee Admin"]
  },
  {
    id: "view_events",
    title: "Manage Events",
    description: "View all events",
    icon: Calendar,
    href: "/admin/events",
    category: "Events",
    color: "green",
    roles: ["Super Admin", "Province Admin", "District Admin", "Committee Admin"]
  },

  // Messages
  {
    id: "publish_message",
    title: "Publish Message",
    description: "Write official statement",
    icon: MessageSquarePlus,
    href: "/admin/leadership-messages/new",
    category: "Content",
    color: "pink",
    roles: ["Super Admin", "Province Admin"]
  },
  {
    id: "view_messages",
    title: "Official Messages",
    description: "Manage leadership notes",
    icon: MessageSquare,
    href: "/admin/leadership-messages",
    category: "Content",
    color: "pink",
    roles: ["Super Admin", "Province Admin"]
  },

  // Settings & System
  {
    id: "homepage_settings",
    title: "Homepage Settings",
    description: "Manage landing page",
    icon: Globe,
    href: "/admin/settings/homepage",
    category: "Website",
    color: "teal",
    roles: ["Super Admin", "Province Admin"]
  },
  {
    id: "organization_settings",
    title: "Organization",
    description: "Platform configurations",
    icon: Building2,
    href: "/admin/settings",
    category: "Settings",
    color: "teal",
    roles: ["Super Admin"]
  }
];
