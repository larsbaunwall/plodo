<template>
	<nav
		class="navbar is-fixed-top is-spaced"
		role="navigation"
	>
		<div class="container">
			<div class="navbar-brand">
				<a
					class="navbar-item"
					href="https://www.plodo.io"
				>
					<img
						src="../assets/artwork/logo.png"
						alt="plodo.io - live audience feedback"
					>
				</a>
				<a
					role="button"
					class="navbar-burger burger"
					aria-label="menu"
					aria-expanded="false"
					data-target="plodo-menu"
				>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>
			<div
				id="plodo-menu"
				class="navbar-menu"
			>
				<div class="navbar-end">
					<a
						href="#home"
						data-target="home"
						class="navbar-item is-hidden-mobile"
					>
						Home
					</a>
					<a
						href="#features"
						data-target="top"
						class="navbar-item is-hidden-mobile"
					>
						Features
					</a>
					<a
						href="#faq"
						data-target="faq"
						class="navbar-item"
					>
						FAQ
					</a>
					<a
						href="https://github.com/larsbaunwall"
						class="navbar-item"
					>
						Contact
					</a>
				</div>
				<span class="navbar-item">
					<a
						href="#join"
						data-target="join"
						class="button is-success is-rounded"
					>
						<span class="icon">
							<i class="fas fa-play"></i>
						</span>
						<span>Join session</span>
					</a>
				</span>
			</div>
		</div>
	</nav>
</template>

<script>
export default {
	mounted() {
		document.addEventListener("DOMContentLoaded", () => {
			// Get all "navbar-burger" elements
			const $navbarBurgers = Array.prototype.slice.call(
				document.querySelectorAll(".navbar-burger"),
				0
			);

			// Check if there are any navbar burgers
			if ($navbarBurgers.length > 0) {
				// Add a click event on each of them
				$navbarBurgers.forEach(el => {
					el.addEventListener("click", () => {
						// Get the target from the "data-target" attribute
						const target = el.dataset.target;
						const $target = document.getElementById(target);

						// Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
						el.classList.toggle("is-active");
						$target.classList.toggle("is-active");
					});
				});
			}
		});
	}
};
</script>

<style>
</style>