import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";

function ContactUsPage() {
  const [contactData, setContactData] = useState({});
  const { toast } = useToast();

  function handleContactData(e) {
    const { name, value } = e.target;
    setContactData((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(contactData);
    toast({
      description: "Message sent",
      style: {
        backgroundColor: "lightgreen",
      },
    });
    setContactData({});
    // Handle form submission logic here
  }

  return (
    <div className="mt-6 md:w-1/2 mx-auto sm:w-1/2 lg:w-1/3">
      <div className="mx-8 font-sofia-sans">
        <h2 className="text-3xl text-[#061E2B]">Contact Us</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-6">
          <div>
            <Label className="text-[#061E2B]" htmlFor="name">
              Name
            </Label>
            <Input
              onChange={handleContactData}
              id="name"
              name="name"
              required
              className="border-[#061E2B] text-[#061E2B]"
            />
          </div>
          <div>
            <Label className="text-[#061E2B]" htmlFor="email">
              Email
            </Label>
            <Input
              onChange={handleContactData}
              id="email"
              name="email"
              required
              className="border-[#061E2B] text-[#061E2B]"
            />
          </div>
          <div>
            <Label className="text-[#061E2B]" htmlFor="message">
              Message
            </Label>
            <Textarea
              onChange={handleContactData}
              id="message"
              name="message"
              required
              className="border-[#061E2B] text-[#061E2B] w-full h-32 p-2 rounded-md"
            ></Textarea>
          </div>
          <div className="space-y-4 mt-4">
            <Button
              type="submit"
              className="bg-mongo-light-green text-[#061E2B]"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUsPage;
