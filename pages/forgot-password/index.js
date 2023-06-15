/* eslint-disable quotes */
/* eslint-disable semi */

import React, { useState } from "react";
import { Footer } from "@/components/Footer";
// eslint-disable-next-line no-unused-vars
import { Layout } from "@/components/Layout";
import { Header } from "@/components/Header";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { Submit } from "@/components/Buttons/Submit";
import styles from "./forgot.module.css";
import Head from "next/head";
const Forgot = () => {
  const [form, setForm] = useState({});
  const [response, setResponse] = useState("");
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/resetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then((response) => response.json())
      .then((data) => {
        // Manejar la respuesta del servidor
        setResponse(data.message);
        setForm({});
      })
      .catch((error) => {
        // Manejar cualquier error
        console.error("Error:", error);
      });
  };

  return (
    <div className={styles.container}>
      <Header />
      <Head>
        <title>Olvidé mi contraseña | Awericana</title>
      </Head>
      <div className={styles.notification}>
        <h2 className={styles.title}>¿Has olvidado la contraseña?</h2>
        <Form onSubmit={handleSubmit}>
          <Input
            name="email"
            placeholder="Correo electrónico"
            type={"text"}
            label={"Ingresa tu e-mail"}
            onChange={handleChange}
            value={form.email || ""}
          />
          <Submit center={true}>Restablece contraseña</Submit>
        </Form>
        <p className={styles.parrafo}>{response}</p>
      </div>
      <Footer />
    </div>
  );
};

export default Forgot;
