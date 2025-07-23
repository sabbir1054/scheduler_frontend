"use client";

import CenterContainer from "@/components/shared/CenterContainer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const NotFoundPage = () => {
  const [counter, setCounter] = useState(5);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    if (counter === 0) {
      router.push("/");
    }

    return () => clearInterval(timer);
  }, [counter, router]);

  return (
    <div style={{ backgroundColor: "var(--secondary)" }}>
      <CenterContainer>
        <Image
          style={{ width: "100%" }}
          src={"/images/notFoundPage/notfound.png"}
          alt={"Not found image"}
          width={500}
          height={350}
          layout="responsive"
          objectFit="cover"
        />
        <div className="flex justify-center mb-5">
          {/* <Button size="lg" variant="default">
            Back to Home ({counter}s)
          </Button> */}
        </div>
      </CenterContainer>
    </div>
  );
};

export default NotFoundPage;
