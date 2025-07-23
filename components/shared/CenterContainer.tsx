import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const CenterContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full px-4">
      <div
        className="max-w-4xl w-full"
        style={{ backgroundColor: "var(--background)" }}
      >
        {children}
      </div>
    </div>
  );
};

export default CenterContainer;
