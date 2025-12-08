import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <div className="flex">
        <AppSidebar />
        <main className="grow w-full">{children}</main>
      </div>
    </SidebarProvider>
  );
}
