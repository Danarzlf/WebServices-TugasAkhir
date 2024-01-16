import React from "react";
import { Container } from "react-bootstrap";
import NavBarNotification from "../../components/NavBar/NavBarNotification";

// Icons
import { GoArrowLeft } from "react-icons/go";
import { IoNotificationsCircleSharp } from "react-icons/io5";

import "../../components/styles/Notification.css";

const Notification = () => {
  return (
    <>
      <NavBarNotification />
      <section className="section-50">
        <div className="container">
          <h3 className="m-b-50 heading-line">
            Notifikasi <i className="fa fa-bell text-muted" />
          </h3>
          <div className="notification-ui_dd-content">
            <div className="notification-list notification-list--unread">
              <div className="notification-list_content">
                <div className="notification-list_img">
                  <img src="notification_icon.png" alt="user" />
                </div>
                <div className="notification-list_detail">
                  <p>
                    <b>Richard Miles</b> liked your post
                  </p>
                  <p className="text-muted">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Unde, dolorem.
                  </p>
                  <p className="text-muted">
                    <small>10 mins ago</small>
                  </p>
                </div>
              </div>
              <div className="notification-list_feature-img">
                <img
                  src="https://i.imgur.com/AbZqFnR.jpg"
                  alt="Feature image"
                />
              </div>
            </div>
          </div>
          <div className="text-center">
            <a href="#!" className="dark-link">
              Load more activity
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Notification;
