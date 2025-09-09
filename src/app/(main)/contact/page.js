
import HeyFormEmbed from "@/components/single-hey-form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      

      <main className="flex-1 bg-white dark:bg-gray-900">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/30 py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
              Get in touch with us for any inquiries or assistance. We're here to help.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-40">
            {/* Contact Form */}
            <div className="w-full lg:w-[725px]">
              <HeyFormEmbed url="jkP7xmDc" />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Contact Information</h2>
              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    title: "Address",
                    details: (
                      <>
                        123 Healthcare Avenue<br />
                        Medical District<br />
                        City, State 12345
                      </>
                    ),
                  },
                  {
                    icon: Phone,
                    title: "Phone",
                    details: (
                      <>
                        Main: (555) 123-4567<br />
                        Emergency: (555) 911-0000
                      </>
                    ),
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    details: (
                      <>
                        info@medicare.com<br />
                        support@medicare.com
                      </>
                    ),
                  },
                  {
                    icon: Clock,
                    title: "Hours of Operation",
                    details: (
                      <>
                        Monday - Friday: 8:00 AM - 8:00 PM<br />
                        Saturday: 9:00 AM - 5:00 PM<br />
                        Sunday: Emergency Only
                      </>
                    ),
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <item.icon className="w-6 h-6 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-gray-100">{item.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{item.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
};

export default Contact;
