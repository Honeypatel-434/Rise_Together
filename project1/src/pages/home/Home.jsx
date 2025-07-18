import React from "react";
import "./Home.scss";
import Featured from "../../components/featured/Featured";
import TrustedBy from "../../components/trustedBy/TrustedBy";
import Slide from "../../components/slide/Slide";
import CatCard from "../../components/catCard/CatCard";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { cards, projects } from "../../data";

function Home() {
  return (
    <div className="home">
      <Featured />
      <TrustedBy />
      
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>

      <div className="features">
        <div className="container">
          <div className="item">
            <h1>Empower Ideas, Fund the Future</h1>
            <div className="title">
              <img src="./img/check.png" alt="check" />
              Back Projects You Believe In
            </div>
            <p>
              Discover inspiring projects and support creators making a difference.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="check" />
              Transparent Milestones
            </div>
            <p>
              See how your contributions help creators hit their goals every step of the way.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="check" />
              Secure Transactions
            </div>
            <p>
              Your funds are held securely and only released when funding goals are met.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="check" />
              Global Community
            </div>
            <p>
              Join a network of backers and innovators from around the world.
            </p>
          </div>
          <div className="item">
            <video src="./img/crowdfunding.mp4" controls />
          </div>
        </div>
      </div>

      {/* <div className="explore">
        <div className="container">
          <h1>Explore Campaign Categories</h1>
          <div className="items">
            {[
              { title: "Tech & Innovation", icon: "tech-innovation.svg" },
              { title: "Creative Projects", icon: "creative.svg" },
              { title: "Social Impact", icon: "social-impact.svg" },
              { title: "Health & Wellness", icon: "health.svg" },
              { title: "Education", icon: "education.svg" },
              { title: "Gaming", icon: "gaming.svg" },
              { title: "Environment", icon: "environment.svg" },
              { title: "Music & Film", icon: "music-film.svg" },
              { title: "Community Projects", icon: "community.svg" },
              { title: "Startups", icon: "startups.svg" },
            ].map((cat) => (
              <div className="item" key={cat.title}>
                <img
                  src={`./img/categories/${cat.icon}`}
                  alt={cat.title}
                />
                <div className="line"></div>
                <span>{cat.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>
              GigHub <i>for Creators</i>
            </h1>
            <h1>Launch Your Campaign <i>with Confidence</i></h1>
            <p>
              Whether you're building a product, filming a documentary, or saving the planet—GigHub helps you bring your ideas to life.
            </p>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Tools to plan, launch, and promote your campaign
            </div>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Insights and analytics to track progress
            </div>
            <div className="title">
              <img src="./img/check.png" alt="" />
              Build your backer community
            </div>
            <button>Start a Campaign</button>
          </div>
          <div className="item">
            <img
              src="./img/creators-dashboard.png"
              alt="creator tools"
            />
          </div>
        </div>
      </div>

      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide> */}
    </div>
  );
}

export default Home;
