export function buildWhatsAppUrl(message: string): string {
  const number = import.meta.env.PUBLIC_WHATSAPP_NUMBER;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
