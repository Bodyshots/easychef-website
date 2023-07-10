// Code from https://www.youtube.com/watch?v=pTinipkJBcs

import { motion } from 'framer-motion';

const animations = {
    // Animation process:
    // initial => animate => exit

    // Here, animation is just a moving fade in/out
    // Initial: New page starts at the right, w/ opacity 0
    // Animate: New page fades in at the centre of the screen
    // Exit: Old page fades out while going left
    initial: {opacity: 0, x: 100},
    animate: {opacity: 1, x: 0},
    exit: {opacity: 0, x: -100},
}

const AnimatePage = ({children}) => {
    return (
        <motion.div 
            variants={animations}
            initial="initial"
            animate="animate"
            exit="exit"
            transition= { {duration: 0.4} }
        >
            {children} {/* "children" the specific page */}
        </motion.div>
    )
}

export default AnimatePage;