import { cn } from '@nextui-org/react';

const Page = ({ children, className }: { children: React.ReactNode; className?:string }) => {

  return (
    <div className={cn('h-full', className)}>
      {children}
    </div>
  );
};

Page.Title = ({ children, className }: { children: React.ReactNode; className?:string }) => (
  <h1 className={cn("text-3xl font-semibold mb-4", className)}>{children}</h1>
)

Page.Body = ({ children, className }: { children: React.ReactNode; className?:string }) => (
  <div className={cn("", className)}>{children}</div>
)

export default Page;

