import React, {useState, useEffect} from "react";
import {withFormik, Form, Field} from "formik";
import axios from "axios";
import * as Yup from "yup";

const UserForm = ({values, errors, touched, status }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
      status && setUsers(users => [...users, status]);
    }, [status]);

    return(
        <div>
            <Form>
                <label htmlFor="name">Name</label>
                <Field type="text" name="name"/>
                    {touched.name && errors.name && (<p className="errors">{errors.name}</p>)}
                <label htmlFor="name">Email</label>
                <Field type="email" name="email"/>
                    {touched.email && errors.email && (<p className="errors">{errors.email}</p>)}
                <label htmlFor="name">Password</label>
                <Field type="password" name="password"/>
                    {touched.password && errors.password && (<p className="errors">{errors.password}</p>)}
                <label htmlFor="checkbox">
                    Accept Terms of Service
                <Field type="checkbox" name="terms" checked={values.terms}/>
                </label>
                <button>Submit</button>             
            </Form>

            <div className="user-container">
                {users.map(user => (
                    <div className= "user-card" key={user.id}>
                        <h2>{user.name}</h2>
                        <p>{`Email: ${user.email}`}</p>
                    </div>
                ))}
            </div>
        </div>
        
    );
}

const FormikUserForm = withFormik({
    mapPropsToValues({ name, email, password, terms}) {
        return{
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required("Please enter a name."),
        email: Yup.string().required("Please enter an email."),
        password: Yup.string()
            .min(6, "Your passowrd needs to include at least 6 characters.")
            .required("Please enter a password."),
        terms: Yup.string().required("You must accept the Terms of Service.")
      }),
      handleSubmit(values, { setStatus }) {
        axios
          .post("https://reqres.in/api/users/", values)
          .then(res => {
            setStatus(res.data);
            console.log(res);
          })
          .catch(err => console.log(err.response));
      }

})(UserForm)

export default FormikUserForm;