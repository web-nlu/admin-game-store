export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
};

export function formatVietnamTime(epochSeconds: number): string {
  const date = new Date(epochSeconds * 1000); // Convert to milliseconds
  // Chuyển về múi giờ Việt Nam bằng cách thêm offset 7 giờ
  const vietnamOffset = 7 * 60; // phút
  const localTime = new Date(date.getTime() + vietnamOffset * 60 * 1000);

  // Format đơn giản: dd/MM/yyyy HH:mm:ss
  const day = String(localTime.getUTCDate()).padStart(2, '0');
  const month = String(localTime.getUTCMonth() + 1).padStart(2, '0'); // Months start at 0
  const year = localTime.getUTCFullYear();
  const hours = String(localTime.getUTCHours()).padStart(2, '0');
  const minutes = String(localTime.getUTCMinutes()).padStart(2, '0');
  const seconds = String(localTime.getUTCSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export function getCookie(name: string, cookie: string): string | null {
  const match = cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

export function formatShortCurrency(amount: number): string {
  if (amount >= 1000000000) {
    return (amount / 1000000000).toFixed(1) + 'B';
  } else if (amount >= 1000000) {
    return (amount / 1000000).toFixed(1) + 'M';
  }
  return formatPrice(amount);
}

export function getPercentage(value: number, total: number) {
  return total > 0 ? Math.round((value / total) * 100) : 0;
}