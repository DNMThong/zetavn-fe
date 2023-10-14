export const fileImageToUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    } else {
      reject(new Error("Đây không phải là một tệp hình ảnh."));
    }
  });
};
