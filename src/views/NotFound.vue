<template>
	<div class="container">
		<canvas id="#canvas"></canvas>
		<div class="error-page">
			<h1>Oops, something went wrong!</h1>
			<div class="moon__container">
				<div class="four four1">4</div>
				<a
					@mouseenter="showWarning = !showWarning"
					@mouseleave="showWarning = !showWarning"
					class="moon"
					href="/"
				>
					<div class="crater crater1"></div>
					<div class="crater crater2"></div>
					<div class="crater crater3"></div>
					<div class="crater crater4"></div>
					<div class="crater crater5"></div>
					<div class="shadow"></div>
					<div class="eye eye-left"></div>
					<div class="eye eye-right"></div>
					<div class="mouth"></div>
					<div class="blush blush1"></div>
					<div class="blush blush2"></div>
				</a>
				<div class="four four2">4</div>
				<div class="orbit">
					<div class="rocket">
						<div class="window"></div>
					</div>
				</div>
			</div>
			<p class="error-text">Back to <a href="/">safety</a>!</p>
		</div>
	</div>
</template>

<script>
export default {
	mounted() {
		const canvas = document.querySelector("canvas");
		const c = canvas.getContext("2d");

		canvas.width = innerWidth;
		canvas.height = innerHeight;

		const backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height);
		backgroundGradient.addColorStop(0, "#171e26");
		backgroundGradient.addColorStop(1, "#3f586b");

		function Star(x, y, radius, color) {
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.color = color;
			this.velocity = {
				x: (Math.random() - 0.5) * 16,
				y: 3,
			};

			this.friction = 0.8;
			this.gravity = 1;
		}

		Star.prototype.draw = function () {
			c.save();
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			c.fillStyle = this.color;
			c.shadowColor = "#e3eaef";
			c.shadowBlur = 20;
			c.fill();
			c.closePath();
			c.restore();
		};

		Star.prototype.update = function () {
			this.draw();

			if (this.y + this.radius + this.velocity.y > canvas.height) {
				this.velocity.y = -this.velocity.y * this.friction;
				this.shatter();
			} else {
				this.velocity.y += this.gravity;
			}

			if (
				this.x + this.radius + this.velocity.x > canvas.width ||
				this.x - this.radius <= 0
			) {
				this.velocity.x = -this.velocity.x * this.friction;
			}

			this.x += this.velocity.x;
			this.y += this.velocity.y;
		};

		let backgroundStars;

		function init() {
			backgroundStars = [];

			for (let i = 0; i < 100; i++) {
				const x = Math.random() * canvas.width;
				const y = Math.random() * canvas.height;
				const radius = Math.random() * 3;
				backgroundStars.push(new Star(x, y, radius, "white"));
			}
		}

		function animate() {
			requestAnimationFrame(animate);
			c.fillStyle = backgroundGradient;
			c.fillRect(0, 0, canvas.width, canvas.height);

			backgroundStars.forEach(backgroundStar => {
				backgroundStar.draw();
			});
		}
		init();
		animate();
	},
	data() {
		return {
			showWarning: false,
		};
	},
};
</script>

<style lang="scss" scoped>
#app {
	height: 100vh;
	display: flex;
	flex-direction: column;
}

body {
	background-color: #171e26;
}

.container {
	position: relative;
	display: flex;
	flex-direction: column;
	height: 100%;
	padding-top: 60px;
}

.error-page {
	text-align: center;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}

h1 {
	margin: 0 0 80px;
	color: #fff;
}
.error-text {
	color: #fff;
	margin-top: 80px;
}
.warning {
	position: absolute;
	top: 100px;
	left: 50%;
	transform: translateX(-50%);
	color: #fff;
}
.error-page a {
	text-decoration: none;
	color: #1881b5;
	transition: 0.3s all ease-in-out;
}
.error-page a:hover,
.error-page a:active {
	color: #ade4ff;
}
.moon__container {
	position: relative;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}
.four {
	font-size: 10vw;
	color: #1881b5;
	font-weight: 700;
	margin: 0 20px;
}
.four1 {
	left: 0;
}
.four2 {
	right: 0;
}
.moon {
	background-color: #f9f8df;
	height: 170px;
	width: 170px;
	border-radius: 50%;
	text-decoration: none;
	margin: auto;
	overflow: hidden;
	z-index: 10;
	cursor: pointer;
	transition: 0.5s all ease-in-out;
}
.moon:hover .eye {
	background-color: transparent;
	border: none;
	border-left: 4px solid #161616;
	border-top: 4px solid #161616;
	border-radius: 0%;
}
.moon:hover .eye-left {
	bottom: 257px;
}
.moon:hover .eye-right {
	bottom: 269px;
}
.moon:hover .blush {
	background-color: #f8bffa;
}
.crater {
	background-color: #e9e8d6;
	height: 30px;
	width: 30px;
	border-radius: 50%;
	position: relative;
}
.crater::before {
	position: absolute;
	content: "";
	width: 25px;
	height: 25px;
	border-radius: 50%;
	box-shadow: -5px 0 0 2px #dddbbf;
	top: 2px;
	left: 7px;
}
.crater1 {
	top: 27px;
	left: 90px;
	transform: scale(0.9);
}
.crater2 {
	bottom: 15px;
	left: 61px;
	transform: scale(0.6);
}
.crater3 {
	left: 15px;
	transform: scale(0.75);
}
.crater4 {
	top: 32px;
	left: 107px;
	transform: scale(1.18);
}
.crater5 {
	bottom: 4px;
	left: 33px;
	transform: scale(0.65);
}
.shadow {
	height: 190px;
	width: 190px;
	box-shadow: 21px 0 0 5px rgba(0, 0, 0, 0.15);
	border-radius: 50%;
	position: relative;
	bottom: 157.5px;
	right: 45px;
}
.eye {
	height: 12px;
	width: 12px;
	background-color: #161616;
	border-radius: 50%;
	position: relative;
	transform: rotate(45deg);
	box-sizing: border-box;
	transition: 0.2s all ease-in-out;
}
.eye-left {
	bottom: 255px;
	left: 59px;
}
.eye-right {
	bottom: 267px;
	left: 101px;
}
.mouth {
	height: 11px;
	width: 16px;
	border: 3px solid #161616;
	position: relative;
	bottom: 262px;
	left: 79px;
	border-top: none;
	border-radius: 0 0 10px 10px;
	box-sizing: border-box;
	transition: 0.2s all ease-in-out;
}
.blush {
	height: 7px;
	width: 7px;
	background-color: #dddbbf;
	position: relative;
	transition: 0.5s all ease-in-out;
}
.blush1 {
	bottom: 273px;
	left: 50px;
}
.blush2 {
	bottom: 281px;
	left: 115px;
}
.orbit {
	height: 280px;
	width: 280px;
	border-radius: 50%;
	position: absolute;
	margin: auto;
	left: -35px;
	top: -50px;
	animation: spin 5s linear infinite;
}
.rocket {
	background-color: #fafcf7;
	height: 50px;
	width: 25px;
	border-radius: 50% 50% 0 0;
	position: relative;
	left: -11px;
	top: 115px;
}
.rocket::before {
	position: absolute;
	content: "";
	background: linear-gradient(
		to right,
		#a54144 15px,
		transparent 15px,
		transparent 40px,
		#65172c 40px
	);
	height: 20px;
	width: 55px;
	border-radius: 50% 50% 0 0;
	right: -15px;
	bottom: 0;
}
.rocket::after {
	position: absolute;
	content: "";
	background-color: #858585;
	height: 4px;
	width: 15px;
	border-radius: 0 0 2px 2px;
	bottom: -4px;
	left: 4px;
}
.window {
	height: 10px;
	width: 10px;
	background-color: #151845;
	border: 2px solid #b8d2ec;
	border-radius: 50%;
	position: relative;
	top: 17px;
	left: 5px;
}
@keyframes spin {
	100% {
		transform: rotate(360deg);
	}
}
</style>
