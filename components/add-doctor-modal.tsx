import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface AddDoctorModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const AddDoctorModal = ({ open, setOpen }: AddDoctorModalProps) => {
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    console.log(data);
    try {
      const response = await fetch("/api/doctor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Doctor added successfully!");
        setOpen(false);
      } else {
        toast.error("Failed to add doctor");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="flex items-center">
          <DialogTitle>Add New Doctor</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <Input name="name" type="text" placeholder="Doctor Name" required />
            <Input
              name="specialization"
              type="text"
              placeholder="Specialization"
              required
            />
            <Input
              name="experience"
              type="number"
              placeholder="Experience (in years)"
              required
            />
            <Select name="consult_type" required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Consult Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="hospital">Hospital</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input
              name="consult_fee"
              type="number"
              placeholder="Consultation Fee"
              required
            />
            <Input
              name="location"
              type="text"
              placeholder="Location"
              required
            />
            <Button type="submit">Add Doctor</Button>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default AddDoctorModal;
