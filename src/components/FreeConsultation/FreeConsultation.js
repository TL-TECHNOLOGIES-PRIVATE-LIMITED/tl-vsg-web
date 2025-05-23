import { freeConsultation } from "@/data/freeConsultation";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import TextSplit from "../Reuseable/TextSplit";
import { organization } from "src/api/api";

const { title, titleHighlight, phone, phoneHref, email } = freeConsultation;

const FreeConsultation = () => {
  const [organizationDetails, setOrganizationDetails] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const contactData = await organization();
        if (contactData.data) {
          const fullAddress = contactData.data.data.location;
          const addressParts = fullAddress.split(/(.*?,.*?,)/g).filter(Boolean);
  
          // Format the phone number by adding a space only after the first two digits
          const phone = contactData.data.data.phone;
          const formattedPhone = phone.length > 2 ? phone.slice(0, 2) + " " + phone.slice(2) : phone;
  
          setOrganizationDetails({
            ...contactData.data.data,
            formattedAddress: addressParts, // Store as an array
            phone: formattedPhone, // Store the formatted phone number
          });
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  
  
    
  return (
    <section className="free-consultation">
      <Container>
        <div className="free-consultation__inner animated fadeInUp">
          <div className="free-consultation__left">
            <h3 className="free-consultation__content">
              <TextSplit text={title} highlight={titleHighlight} />
            </h3>
            <div className="free-consultation__icon">
              <span className="icon-phone-call"></span>
            </div>
          </div>
          <div className="free-consultation__right">
            <h4 className="free-consultation__contact-info">
              <a
                href={`tel:+${organizationDetails.phone}`}
                className="free-consultation__contact-number"
              >
                +{organizationDetails.phone}
              </a>
              <a
                href={`mailto:${organizationDetails.email}`}
                className="free-consultation__contact-email"
              >
                {organizationDetails.email}
              </a>
            </h4>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FreeConsultation;
