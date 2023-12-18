import { parse } from "date-fns";

export const calculateTime = (dateStr: string) => {
  // Assuming the input date string is in UTC format
  const inputDate: any = parse(dateStr, "hh:mma dd/MM/yyyy", new Date());

  // Get current date
  const currentDate: any = new Date();

  // Set up date formats for tiếng Việt
  const timeFormat = {
    hour: "numeric" as const,
    minute: "numeric" as const,
  };
  const dateFormat = {
    day: "2-digit",
    month: "long", // Sử dụng "long" để hiển thị tên tháng
    year: "numeric",
  };

  // Check if it's today, tomorrow, or more than one day ago
  if (
    inputDate.getUTCDate() === currentDate.getUTCDate() &&
    inputDate.getUTCMonth() === currentDate.getUTCMonth() &&
    inputDate.getUTCFullYear() === currentDate.getUTCFullYear()
  ) {
    // Today: Convert to AM/PM format in Vietnamese
    const ampmTime = inputDate.toLocaleTimeString("vi-VN", timeFormat);
    return ampmTime;
  } else if (
    inputDate.getUTCDate() === currentDate.getUTCDate() - 1 &&
    inputDate.getUTCMonth() === currentDate.getUTCMonth() &&
    inputDate.getUTCFullYear() === currentDate.getUTCFullYear()
  ) {
    // Tomorrow: Show "Yesterday" in Vietnamese
    return "Hôm qua";
  } else if (
    Math.floor((currentDate - inputDate) / (1000 * 60 * 60 * 24)) > 1 &&
    Math.floor((currentDate - inputDate) / (1000 * 60 * 60 * 24)) <= 7
  ) {
    const timeDifference = Math.floor(
      (currentDate - inputDate) / (1000 * 60 * 60 * 24)
    );

    const targetDate = new Date();
    targetDate.setDate(currentDate.getDate() - timeDifference);

    const daysOfWeek = [
      "Chủ Nhật",
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
    ];
    const targetDay = daysOfWeek[targetDate.getDay()];

    return targetDay;
  } else {
    // More than 7 days ago: Show date in Vietnamese format
    const formattedDate = inputDate.toLocaleDateString("vi-VN", dateFormat);
    return formattedDate;
  }
};

export const calculateTimeAgo = (dateStr: string) => {
  const inputDate: any = parse(dateStr, "hh:mma dd/MM/yyyy", new Date());
  const currentDate: any = new Date();
  const timeDifference = Math.floor((currentDate - inputDate) / 1000);

  if (timeDifference < 60) {
    return timeDifference + " giây trước";
  } else if (timeDifference < 3600) {
    var minutes = Math.floor(timeDifference / 60);
    return minutes + " phút trước";
  } else if (timeDifference < 86400) {
    var hours = Math.floor(timeDifference / 3600);
    return hours + " giờ trước";
  } else if (timeDifference < 604800) {
    var days = Math.floor(timeDifference / 86400);
    return days + " ngày trước";
  } else {
    var weeks = Math.floor(timeDifference / 604800);
    return weeks + " tuần trước";
  }
};

export const calculateTimeSeconds = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;

  const formattedTime =
    m.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0");

  return formattedTime;
};
