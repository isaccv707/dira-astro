import { useState } from "react";
import { ContactForm } from "../sections/ContactForm";

const ContactSection = () => {

  return (
    <section className="relative bg-white dark:bg-white py-20 px-6 sm:px-10 lg:px-20 overflow-hidden">

      <div className="hidden lg:block absolute right-0 top-0 h-full w-1/2">
        <img
          src="/assets/images/contact-hero.png"
          alt="Contacto Laboratorio"
          className="object-cover h-full w-full rounded-l-3xl shadow-xl"
        />
      </div>

      <div className="max-w-7xl mx-auto lg:flex lg:justify-between lg:items-center relative z-10 gap-12">
        <div className="lg:w-1/2 bg-greenLigth rounded-3xl shadow-2xl p-10">
          <h2 className="font-extrabold text-green-primary flex justify-center text-3xl">
            Contáctanos
          </h2>

          <ContactForm />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
