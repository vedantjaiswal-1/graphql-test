import { Formik, Form, Field } from "formik";
import React, { useState } from "react";
import { Button, Col, Container, FormText, Row } from "react-bootstrap";
import * as Yup from "yup";
import { CREATE_USER } from "../GraphQl/Mutation";
import { useMutation } from "@apollo/client";

const UserSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required")
});
export const AddUser = () => {
  const [register, { error }] = useMutation(CREATE_USER);

  const initialValues = {
    name: "",
    email: "",
    password: ""
  };

  const postUser = (values: any) => {
    register({
      variables: {
        name: values.name,
        email: values.email,
        password: values.password
      }
    });

    if (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Container>
        <h5 className="mt-4">Add User</h5>

        <Formik
          initialValues={initialValues}
          validationSchema={UserSchema}
          onSubmit={(values) => {
            console.log({ values });
            postUser(values);
          }}
        >
          {({ errors, touched, values, handleChange }) => (
            <Form>
              <Row>
                <Col lg={6}>
                  <Field
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="form-control"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(event);
                    }}
                  />
                  {errors.name && touched.name ? (
                    <FormText className="text-danger">
                      <div>{errors.name}</div>
                    </FormText>
                  ) : null}
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg={6}>
                  <Field
                    type="text"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(event);
                    }}
                  />
                  {errors.email && touched.email ? (
                    <FormText className="text-danger">
                      <div>{errors.email}</div>
                    </FormText>
                  ) : null}
                </Col>
              </Row>
              <br />
              <Row>
                <Col lg={6}>
                  <Field
                    type="text"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      handleChange(event);
                    }}
                  />
                  {errors.password && touched.password ? (
                    <FormText className="text-danger">
                      <div>{errors.password}</div>
                    </FormText>
                  ) : null}
                </Col>
              </Row>
              <br />
              <Button type="submit">Save</Button>
            </Form>
          )}
        </Formik>
      </Container>
    </React.Fragment>
  );
};
