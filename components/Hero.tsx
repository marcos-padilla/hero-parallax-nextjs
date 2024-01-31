'use client'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { Header } from './Header'
import ProductCard from './ProductCard'

export default function Hero() {
	const products = Array.from({ length: 15 }).map((_, i) => ({
		title: `Product ${i + 1}`,
		link: '#',
		thumbnail: `https://picsum.photos/200/300?random=${i + 1}`,
	}))

	const firstRow = products.slice(0, 5)
	const secondRow = products.slice(5, 10)
	const thirdRow = products.slice(10, 15)
	const ref = useRef<HTMLDivElement>(null)

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start start', 'end start'],
	})

	const springConfig = {
		stiffness: 300,
		damping: 30,
		bounce: 100,
	}

	const translateX = useSpring(
		useTransform(scrollYProgress, [0, 1], [0, 1000]),
		springConfig
	)

	const translateXReverse = useSpring(
		useTransform(scrollYProgress, [0, 1], [0, -1000]),
		springConfig
	)

	const rotateX = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [15, 0]),
		springConfig
	)

	const opacity = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
		springConfig
	)

	const rotateZ = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [20, 0]),
		springConfig
	)

	const translateY = useSpring(
		useTransform(scrollYProgress, [0, 0.2], [-700, 500]),
		springConfig
	)

	return (
		<div
			ref={ref}
			className='py-40 overflow-visible antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]'
		>
			<Header />
			<motion.div
				style={{
					rotateX,
					rotateZ,
					translateY,
					opacity,
				}}
			>
				<motion.div className='flex flex-row-reverse space-x-reverse space-x-20 mb-20'>
					{firstRow.map((product) => (
						<ProductCard
							product={product}
							translate={translateX}
							key={product.title}
						/>
					))}
				</motion.div>
				<motion.div className='flex flex-row space-x-20 mb-20 '>
					{secondRow.map((product) => (
						<ProductCard
							product={product}
							translate={translateXReverse}
							key={product.title}
						/>
					))}
				</motion.div>
				<motion.div className='flex flex-row-reverse space-x-reverse space-x-20'>
					{thirdRow.map((product) => (
						<ProductCard
							product={product}
							translate={translateX}
							key={product.title}
						/>
					))}
				</motion.div>
			</motion.div>
		</div>
	)
}
