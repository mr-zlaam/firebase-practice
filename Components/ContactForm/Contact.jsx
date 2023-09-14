import { useState } from 'react';

import './Contact.css';

const ContactForm = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        message: ''
    });

    const getUserData = (event) => {
        const { name, value } = event.target;
        setUser({ ...user, [name]: value });
    };
    const PostData = async (e) => {
        e.preventDefault();
        const { name, email, message } = user;
        if (name && email && message) {
            const res = await fetch('https://reactformstoring-default-rtdb.firebaseio.com/zlaamDatabase.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    message,
                })
            });

            if (res.status === 200) { // Check the HTTP status code
                setUser({
                    name: '',
                    email: '',
                    message: ''
                });
                alert('Form submitted successfully')
            } else {
                alert('Something went wrong. Please try again later.');
            }
        } else {
            alert('Please fill in all fields');
        }
    };


    return (
        <>
            <div className="contact_form w-eighty m-auto">
                <h1 className="text-center font-lg-bold text-xl">Let's Chat</h1>
                <form action="" className="h-30" method='POST'>
                    <div className="form_controller">
                        <div className="input_control">
                            <label className="label" htmlFor="text">Name</label>
                            <input type="text" name="name" id="text"
                                value={user.name} onChange={getUserData} autoComplete="off" required />
                        </div>
                        <div className="input_control">
                            <label className="label" htmlFor="email">Email</label>
                            <input type="email" name="email" id="email"
                                value={user.email} onChange={getUserData} autoComplete="off" required />
                        </div>
                        <div className="input_control">
                            <label className="label" htmlFor="textarea">Your Thoughts</label>
                            <textarea value={user.message} onChange={getUserData} name="message" id="textarea" cols="30" rows="5" ></textarea>
                        </div>
                        <div className="btn w-fit m-auto">
                            <button className="px-1 py-normal cursor-pointer sm-rounded" onClick={PostData}>Submit</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ContactForm;
