import Container from 'react-bootstrap/Container';
import { useEffect, forwardRef } from 'react';
import './aboutus.css';
import AOS from "aos";

const AboutUs = forwardRef((props, ref) => {
    useEffect(() => {
        AOS.init({ duration: 1000 });
    }, []);

    const aboutustext = () => {
        return (
            <div className="about_us_text_sec">
            <span id="about_us_title"><h3>About Us</h3></span>
            <Container className='about_us_text'>
                {/* Text provided by ChatGPT */}
                <p id='text'>
                Welcome to our cozy little corner of the internet, where we're all about good food,
                good vibes, and great times. Our recipe creation and sharing website is the perfect place
                to find inspiration, get creative in the kitchen, and share your culinary masterpieces with the world.
                <br />
                <br />
                Our team of recipe creators and food enthusiasts are dedicated to bringing you recipes that are not only delicious
                but also easy to follow. We believe that everyone has the potential to be a great chef, and we're here to make that journey
                a little easier and a lot more fun.
                <br />
                <br />
                Whether you're looking for classic comfort foods, healthy meal ideas, or something a little more adventurous, our website
                has got you covered. We offer a wide range of recipes that cater to all tastes and preferences, so there's something for everyone.
                <br />
                <br />
                But our website is more than just a collection of recipes. We're a community of food lovers who love to share our passion
                for cooking, eating, and living well. We encourage you to join our community, share your recipes, and connect with other
                like-minded chefs from all over the world.
                <br />
                <br />
                So, if you're looking for a place where you can let your creativity flow, experiment with new flavors,
                and become the chef you always knew you could be, look no further than our cozy little recipe haven.
                With us, you're always just a few clicks away from being a master chef in your own kitchen.
                <br />
                <br />
                </p>
                <div className='center'><b>Let's get cooking!</b></div>
            </Container>
            </div>
        );
    }

    return (
    <div data-aos="fade-up" ref={ref} className='about_us'>
        {aboutustext()}
        {/* Image from:
        https://www.pxfuel.com/en/desktop-wallpaper-aomvl */}
        <div className='about_us_pic_sec'>
            <span id='about_us_text'>Cooking has never been easier</span>
        </div>
    </div>
    );
});

export default AboutUs;