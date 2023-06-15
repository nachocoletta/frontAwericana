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
import styles from "./new.module.css";
import Head from "next/head";

const Newpassword = () => {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [response, setResponse] = useState("");
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/newPassword`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then((response) => response.json())
      .then((data) => {
        // Manejar la respuesta del servidor
        setResponse(data.msg);
        setForm({ email: "", password: "" });
      })
      .catch((error) => {
        // Manejar cualquier error
        console.error("Error:", error);
      });
  };

  return (
    <div className={styles.container}>
      <Header disabled={true} />
      <Head>
        <title>Recuerar contraseña | Awericana</title>
      </Head>
      <div className={styles.notification}>
        <h2 className={styles.title}>
          Ingresa tu correo y tu nueva contraseña
        </h2>
        <Form onSubmit={handleSubmit}>
          <Input
            name="email"
            placeholder="Correo electrónico"
            type={"text"}
            label={"Ingresa tu e-mail"}
            onChange={handleChange}
            value={form.email || ""}
          />
          <Input
            name="password"
            placeholder="Ingresa tu nueva contraseña"
            type={"password"}
            label={"Ingresa tu nueva contraseña"}
            onChange={handleChange}
            value={form.password || ""}
          />
          <Submit center={true}>Restablecer contraseña</Submit>
          <p className={styles.parrafo}>{response}</p>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default Newpassword;
