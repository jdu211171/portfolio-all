import {
  HelpIcon,
  HomeIcon,
  NewsIcon,
  PersonIcon,
  ScheduleIcon,
  SelectedIcon,
  SettingIcon,
  StudentsIcon,
} from "../icons";

export const navLinks = [
  {
    id: 11,
    link: "/home",
    label: "ホーム",
    icon: (e) => HomeIcon({ fill: e }),
  },
  {
    id: 1,
    link: "/students",
    label: "学生",
    icon: (e) => StudentsIcon({ fill: e }),
  },
  {
    id: 76,
    link: "/employees",
    label: "職員",
    icon: (e) => PersonIcon({ fill: e }),
  },

  {
    id: 3,
    link: "/recruitors",
    label: "リクルーター",
    icon: (e) => PersonIcon({ fill: e }),
  },
  {
    id: 2,
    link: "/parents",
    label: "保護者",
    icon: (e) => PersonIcon({ fill: e }),
  },
  {
    id: 5,
    link: "/courses",
    label: "Courses",
    icon: (e) => PersonIcon({ fill: e }),
  },

  {
    id: 6,
    link: "/selected",
    label: "気になる",
    icon: (e) => SelectedIcon({ fill: e }),
  },

  {
    id: 9,
    link: "/me",
    label: "プロフィール",
    icon: (e) => PersonIcon({ fill: e }),
  },
  {
    id: 10,
    link: "/myChild",
    label: "生徒",
    icon: (e) => PersonIcon({ fill: e }),
  },
];

export const settingLinks = [
  {
    id: 0,
    link: "/settings",
    label: "設定",
    icon: (e) => SettingIcon({ fill: e }),
  },
  {
    id: 1,
    link: "/help",
    label: "ヘルプ",
    icon: (e) => HelpIcon({ fill: e }),
  },
];

export const recruitorLink = ["ホーム", "学生", "気になる"];

export const teacherLink = ["ホーム", "学生",];

export const decanLink = [
  "ホーム",
  "学生",
  "職員",
  "スケジュール",
  "リクルーター",
  "保護者",
];
export const studentLink = ["ホーム", "スケジュール", "プロフィール"];

export const parentLink = ["ホーム", "生徒",];
