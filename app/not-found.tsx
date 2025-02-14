import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] gap-4">
      <h2 className="text-2xl font-bold">Sayfa Bulunamadı</h2>
      <p className="text-muted-foreground">İstediğiniz sayfa bulunamadı.</p>
      <Link href="/" className="text-primary hover:underline mt-4">
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
