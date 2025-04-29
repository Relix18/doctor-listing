import DoctorCard from "@/components/DoctorCard";
import Filter from "@/components/filter";
import Header from "@/components/Header";
import { ListPagination } from "@/components/Pagination";
import { IDoctor } from "@/models/model";

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

type FilterOptions = {
  search?: string;
  page?: string;
  consultTypes?: string[];
  experience?: string[];
  fees?: string[];
};

const fetchList = async ({
  search,
  page = "1",
  consultTypes = [],
  experience = [],
  fees = [],
}: FilterOptions) => {
  try {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (page) params.set("page", page);
    if (consultTypes.length) params.set("consultTypes", consultTypes.join(","));
    if (experience.length) params.set("experience", experience.join(","));
    if (fees.length) params.set("fees", fees.join(","));

    const url = `${
      process.env.NEXT_PUBLIC_URL
    }/api/doctor?${params.toString()}`;

    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    return data || [];
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
};

export default async function Home({ searchParams }: HomeProps) {
  const { search, page, consultTypes, experience, fees } = await searchParams;

  const data = await fetchList({
    search,
    page,
    consultTypes: consultTypes?.split(",") || [],
    experience: experience?.split(",") || [],
    fees: fees?.split(",") || [],
  });

  return (
    <div>
      <Header />
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4 p-4 w-10/12 m-auto">
        <Filter />
        <div className=" col-span-3">
          <h1 className="text-2xl font-bold mb-2">Doctors List</h1>
          <div className="grid grid-cols-1 gap-4">
            {data.doctors?.length === 0 && (
              <div className="text-center">
                <p>No doctors available</p>
              </div>
            )}
            {data.doctors?.map((doctor: IDoctor, i: number) => (
              <div key={i}>
                <DoctorCard
                  name={doctor.name}
                  specialization={doctor.specialization}
                  experience={doctor.experience}
                  consult_type={doctor.consult_type}
                  consult_fee={doctor.consult_fee}
                  location={doctor.location}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center my-4">
        {data.doctors?.length > 0 && (
          <ListPagination totalPages={data.totalPages} />
        )}
      </div>
    </div>
  );
}
