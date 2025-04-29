import { connectDB } from "@/lib/db";
import { Doctor } from "@/models/model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      name,
      specialization,
      experience,
      consult_type,
      consult_fee,
      location,
    } = await req.json();

    await connectDB();

    await Doctor.create({
      name,
      specialization,
      experience,
      consult_type,
      consult_fee,
      location,
    });
    return new NextResponse(JSON.stringify({ message: "Doctor Created" }), {
      status: 201,
    });
  } catch (error) {
    console.log("SERVER_CREATE_DOCTOR_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const experienceParam = searchParams.get("experience");
    const feeRanges = searchParams.get("fees");
    const consultTypes = searchParams.get("consultTypes")?.toLocaleLowerCase();
    const limit = 5;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const query: any = {};

    console.log(consultTypes);

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { specialization: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
      ];
    }

    if (experienceParam) {
      const ranges = experienceParam.split(",");
      const experienceFilters = ranges.map((range) => {
        const [min, max] = range.split("-").map(Number);
        return {
          experience: { $gte: min, $lte: max },
        };
      });

      if (!query.$or) query.$or = [];
      query.$or.push(...experienceFilters);
    }

    if (feeRanges) {
      const ranges = feeRanges.split(",");
      const feeFilters = ranges.map((range) => {
        if (range.includes("+")) {
          const min = parseInt(range.replace("+", ""), 10);
          return { consult_fee: { $gte: min } };
        } else {
          const [min, max] = range.split("-").map(Number);
          return {
            consult_fee: { $gte: min, $lte: max },
          };
        }
      });

      if (!query.$or) query.$or = [];
      query.$or.push(...feeFilters);
    }

    if (consultTypes) {
      const types = consultTypes.split(",");
      query.consult_type = { $in: types };
    }

    const skip = (page - 1) * limit;

    const doctors = await Doctor.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Doctor.countDocuments(query);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      total,
      page,
      totalPages,
      doctors,
    });
  } catch (error) {
    console.log("SERVER_GET_DOCTOR_ERROR", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
