import React from "react";
import styles from "./about.module.scss";
import Link from "next/link";

const data = [
	{
		name: "Sai Sreenadh Chilukuri",
		desc: "Full Stack Developer 2nd year, VIT-AP University",
		linkedin: "https://www.linkedin.com/in/sai-sreenadh-chilukuri-630a2028b/",
		image: "/images/Sreenadh.jpg",
	},
	{
		name: "Mandepudi Kethan Saradhi",
		desc: "Front End Developer 2nd year Scope VIT-AP University",
		linkedin: "https://www.linkedin.com/in/mandepudikethansaradhi/?trk=opento_sprofile_topcard",
		image: "/images/WhatsApp Image 2024-09-02 at 22.10.23_3c1e9089.jpg",
	},
	{
		name: "Gopisetti Gowtham",
		desc: "2nd year Scope VIT-AP University",
		linkedin: "https://www.linkedin.com/in/gopisetti-gowtham-7b3b44296/",
		image: "/images/Gowtham.jpg",
	},
	{
		name: "Mallipeddi Harsha Vardhan",
		desc: "2nd year Scope VIT-AP University",
		linkedin: "https://www.linkedin.com/in/m-harsha-vardhan-a2781a318/",
		image: "/images/Harsha.jpg",
	},
	{
		name: "Angelina Ruth Robert",
		desc: "2nd year Scope VIT-AP University",
		image: "/images/Angelina.jpg",
	},
	{
		name: "Nagavarapu Vaishnavi Sanjana",
		desc: "2nd year Scope VIT-AP University",
		image: "/images/Sanjana.jpg",
	},
];

const About = () => {
	return (
		<>
			<div className={styles.container}>
				{data.map((item, index) => (
					<div className={`card ${styles.card}`} style={{ width: "18rem" }} key={index}>
						<img src={item.image} className={`card-img-top ${styles.cardimg}`} alt="..." />
						<div className="card-body">
							<h5 className="card-title">{item.name}</h5>
							<p className="card-text">{item.desc}</p>
							{item.linkedin ? (
								<>
									<Link target="_blank" href={item.linkedin} class="btn btn-primary">
										Linkedin
									</Link>
								</>
							) : (
								<></>
							)}
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default About;
