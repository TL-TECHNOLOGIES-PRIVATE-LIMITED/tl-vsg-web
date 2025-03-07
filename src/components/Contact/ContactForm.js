import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Enquery } from 'src/api/webapi';

const ContactForm = ({
  formClassName = 'comment-one__form',
  inputClassName = 'comment-form__input-box',
  messageClassName = 'text-message-box',
  btnBoxClassName = 'btn-box',
  btnClassName = 'comment-form__btn',
  btnText = 'Send a message',
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await Enquery(data)

      if (response.data.success) {
        reset(); // Reset form after submission
        toast.success('Submitted Successfully!');
      } else {
        toast.error(response.message || 'Form submission failed.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${formClassName} contact-form-validated`}
    >
      <Row>
        {/* Name Field */}
        <Col xl={6}>
          <div className={inputClassName}>
            <input
              type="text"
              placeholder="Your Name"
              {...register('name', {
                required: 'This field is required.',
                minLength: {
                  value: 3,
                  message: 'Name must be at least 3 characters long.',
                },
                pattern: {
                  value: /^[A-Za-z\s]+$/, // Only allows letters and spaces
                  message: 'Name should contain only letters.',
                },
              })}
            />
            {errors.name && <label className="error" style={{ color: "red" }}>{errors.name.message}</label>}
          </div>

        </Col>

        {/* Subject Field */}
        <Col xl={6}>
          <div className={inputClassName}>
            <input
              type="text"
              placeholder="Subject"
              {...register('subject', { required: 'This field is required.' })}
            />
            {errors.subject && <label className="error" style={{ color: "red" }}>{errors.subject.message}</label>}
          </div>
        </Col>
      </Row>

      <Row>
        {/* Email Field */}
        <Col xl={6}>
          <div className={inputClassName}>
            <input
              type="email"
              placeholder="Your Email"
              {...register('email', {
                required: 'This field is required.',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Enter a valid email.',
                },
              })}
            />
            {errors.email && <label className="error" style={{ color: "red" }}>{errors.email.message}</label>}
          </div>
        </Col>

        {/* Phone Number Field */}
        <Col xl={6}>
          <div className={inputClassName}>
            <input
              type="tel"
              placeholder="Phone Number"
              {...register("phoneNumber", {
                required: "This field is required.",
                pattern: {
                  value: /^[0-9]{10}$/, // ✅ Allows only 10-digit numbers (no spaces, dashes, or country code)
                  message: "Enter a valid 10-digit phone number.",
                },
              })}
            />
            {errors.phoneNumber && <label className="error" style={{ color: "red" }}>{errors.phoneNumber.message}</label>}
          </div>
        </Col>

      </Row>

      <Row>
        <Col xl={12}>
          {/* Message Field */}
          <div className={`${inputClassName} ${messageClassName}`}>
            <textarea
              placeholder="Write a Message"
              {...register('message', {
                required: 'This field is required.',
                minLength: {
                  value: 10,
                  message: 'Message must be at least 10 characters long.',
                },
                maxLength: {
                  value: 100,
                  message: 'Message cannot exceed 100 characters.',
                },
              })}
            ></textarea>
            {errors.message && <label className="error" style={{ color: "red" }}>{errors.message.message}</label>}
          </div>

          {/* Submit Button */}

        </Col>
      </Row>
      <Row>
        <Col xl={12}>  <div className={btnBoxClassName} style={{ marginTop: "30px" }}>
          <button type="submit" className={`thm-btn  ${btnClassName}`}>
            {btnText}
          </button>
        </div></Col>
      </Row>

    </form>
  );
};

export default ContactForm;
