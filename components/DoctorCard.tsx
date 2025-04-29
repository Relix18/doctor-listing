import React from "react";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface DoctorCardProps {
  name: string;
  specialization: string;
  experience: number;
  consult_type: string;
  consult_fee: number;
  location: string;
}

const DoctorCard = ({
  name,
  specialization,
  experience,
  consult_type,
  consult_fee,
  location,
}: DoctorCardProps) => {
  console.log(consult_type);
  return (
    <Card>
      <CardContent className="flex gap-2 justify-between items-center">
        <div className="flex gap-2 items-center">
          <Image width={120} height={150} src={"/placeholder.png"} alt={name} />
          <div>
            <p className="font-bold text-base">{name}</p>
            <p className="text-sm text-gray-400 font-semibold">
              Specialization: {specialization}
            </p>
            <p className="font-semibold text-violet-600">
              Experience: {experience} years
            </p>
            <p className="text-xs text-gray-400 font-semibold">
              Location: {location}
            </p>
          </div>
        </div>
        <div className="gap-2 flex flex-col items-end">
          <p>Fee: {`₹${consult_fee}`}</p>
          {consult_type === "online" ? (
            <CardDescription>Available for consultation</CardDescription>
          ) : (
            <CardDescription>Visit In-Person </CardDescription>
          )}
          <Button className="btn">
            {consult_type === "online" ? "Consult Online" : "Visit Hospital"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DoctorCard;
