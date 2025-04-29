"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button"; // Assuming you have a UI button component

const consult = [
  { id: 1, name: "Online" },
  { id: 2, name: "Hospital" },
];

const experience = [
  { id: 1, name: "0-5" },
  { id: 2, name: "5-10" },
  { id: 3, name: "11-15" },
];

const fees = [
  { id: 1, name: "100-500" },
  { id: 2, name: "500-1000" },
  { id: 3, name: "1000+" },
];

const Filter = () => {
  const router = useRouter();

  const [selectedConsults, setSelectedConsults] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedFees, setSelectedFees] = useState<string[]>([]);

  const toggleSelection = (
    name: string,
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setState((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (selectedConsults.length)
      params.set("consultTypes", selectedConsults.join(","));
    if (selectedExperience.length)
      params.set("experience", selectedExperience.join(","));
    if (selectedFees.length) params.set("fees", selectedFees.join(","));

    router.push(`?${params.toString()}`);
  };

  return (
    <div>
      <Card className="bg-white shadow-md p-4">
        <CardContent>
          <CardTitle className="text-xl font-bold mb-4">Filters</CardTitle>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Mode of Consult</h3>
            <div className="space-y-2 max-h-[calc(100vh-10rem)] overflow-y-auto">
              {consult.map((c) => (
                <div key={c.id} className="flex items-center">
                  <Checkbox
                    id={`consult-${c.id}`}
                    className="mr-2"
                    checked={selectedConsults.includes(c.name)}
                    onCheckedChange={() =>
                      toggleSelection(
                        c.name,
                        selectedConsults,
                        setSelectedConsults
                      )
                    }
                  />
                  <label htmlFor={`consult-${c.id}`} className="text-sm">
                    {c.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Experience</h3>
            <div className="space-y-2 max-h-[calc(100vh-10rem)] overflow-y-auto">
              {experience.map((exp) => (
                <div key={exp.id} className="flex items-center">
                  <Checkbox
                    id={`experience-${exp.id}`}
                    className="mr-2"
                    checked={selectedExperience.includes(exp.name)}
                    onCheckedChange={() =>
                      toggleSelection(
                        exp.name,
                        selectedExperience,
                        setSelectedExperience
                      )
                    }
                  />
                  <label htmlFor={`experience-${exp.id}`} className="text-sm">
                    {exp.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-semibold mb-2">Fees</h3>
            <div className="space-y-2 max-h-[calc(100vh-10rem)] overflow-y-auto">
              {fees.map((fee) => (
                <div key={fee.id} className="flex items-center">
                  <Checkbox
                    id={`fee-${fee.id}`}
                    className="mr-2"
                    checked={selectedFees.includes(fee.name)}
                    onCheckedChange={() =>
                      toggleSelection(fee.name, selectedFees, setSelectedFees)
                    }
                  />
                  <label htmlFor={`fee-${fee.id}`} className="text-sm">
                    {fee.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Button className="mt-4 w-full" onClick={handleApplyFilters}>
            Apply Filters
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Filter;
