"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBaseUrl } from "@/config/envConfig";
import { resourceTypes } from "@/constance/resourceTypes";
import { Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function MakeBookingRequest() {
  const [open, setOpen] = useState(false);
  const [resource, setResource] = useState("");
  const [requestedBy, setRequestedBy] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      resource,
      requestedBy,
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
    };

    try {
      const res = await fetch(`${getBaseUrl()}/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Booking Created:", data);
      console.log(data);

      if (data?.success === true) {
        toast.success("Booking request submitted successfully!");
        setOpen(false); // <-- Close the modal on success
        // Optionally reset form
        setResource("");
        setRequestedBy("");
        setStart("");
        setEnd("");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black text-white">
          <Plus className="w-4 h-4 mr-2" /> Make Booking Request
        </Button>
      </DialogTrigger>

      {/* Modal Content */}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Make a Booking Request</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Resource Select */}
          <div>
            <label className="text-sm font-medium">Resource</label>
            <Select value={resource} onValueChange={setResource}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select resource" />
              </SelectTrigger>
              <SelectContent>
                {resourceTypes?.map((res) => (
                  <SelectItem key={res} value={res}>
                    {res}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Requested By */}
          <div>
            <label className="text-sm font-medium">Requested By</label>
            <Input
              type="text"
              placeholder="Your Name"
              value={requestedBy}
              onChange={(e) => setRequestedBy(e.target.value)}
              required
            />
          </div>

          {/* Start Date-Time */}
          <div>
            <label className="text-sm font-medium">Start Time</label>
            <Input
              type="datetime-local"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              required
            />
          </div>

          {/* End Date-Time */}
          <div>
            <label className="text-sm font-medium">End Time</label>
            <Input
              type="datetime-local"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={loading}
              className="bg-black text-white"
            >
              {loading ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
