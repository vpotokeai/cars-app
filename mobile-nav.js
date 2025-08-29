// Mobile Navigation JavaScript

document.addEventListener('DOMContentLoaded', function () {
	// Create mobile menu elements
	createMobileMenu()

	// Initialize mobile navigation
	initMobileNav()
})

function createMobileMenu() {
	// Create mobile menu toggle button
	const mobileToggle = document.createElement('button')
	mobileToggle.className = 'mobile-menu-toggle'
	mobileToggle.innerHTML = '<span></span><span></span><span></span>'
	mobileToggle.setAttribute('aria-label', 'Toggle mobile menu')

	// Create mobile menu overlay
	const mobileOverlay = document.createElement('div')
	mobileOverlay.className = 'mobile-menu-overlay'

	// Create mobile menu content
	const mobileContent = document.createElement('div')
	mobileContent.className = 'mobile-menu-content'

	// Create close button
	const closeBtn = document.createElement('button')
	closeBtn.className = 'mobile-menu-close'
	closeBtn.innerHTML = '×'
	closeBtn.setAttribute('aria-label', 'Close mobile menu')

	// Create mobile menu list
	const mobileMenu = document.createElement('nav')
	mobileMenu.className = 'mobile-menu'

	// Clone existing menu items or create default ones
	const existingMenu = document.querySelector('.menu ul')
	if (existingMenu) {
		mobileMenu.innerHTML = existingMenu.outerHTML
	} else {
		// Default menu items if none exist
		mobileMenu.innerHTML = `
            <ul>
                <li><a href="#home">Главная</a></li>
                <li><a href="#cars">Автомобили</a></li>
                <li><a href="#about">О нас</a></li>
                <li><a href="#contact">Контакты</a></li>
            </ul>
        `
	}

	// Assemble mobile menu
	mobileContent.appendChild(closeBtn)
	mobileContent.appendChild(mobileMenu)
	mobileOverlay.appendChild(mobileContent)

	// Add to header
	const header = document.querySelector('.header .container')
	if (header) {
		header.appendChild(mobileToggle)
		document.body.appendChild(mobileOverlay)
	}
}

function initMobileNav() {
	const mobileToggle = document.querySelector('.mobile-menu-toggle')
	const mobileOverlay = document.querySelector('.mobile-menu-overlay')
	const closeBtn = document.querySelector('.mobile-menu-close')
	const mobileContent = document.querySelector('.mobile-menu-content')

	if (!mobileToggle || !mobileOverlay) return

	// Toggle mobile menu
	mobileToggle.addEventListener('click', function () {
		mobileOverlay.classList.add('active')
		mobileToggle.classList.add('active')
		document.body.style.overflow = 'hidden'
	})

	// Close mobile menu
	function closeMobileMenu() {
		mobileOverlay.classList.remove('active')
		mobileToggle.classList.remove('active')
		document.body.style.overflow = ''
	}

	closeBtn.addEventListener('click', closeMobileMenu)

	// Close on overlay click
	mobileOverlay.addEventListener('click', function (e) {
		if (e.target === mobileOverlay) {
			closeMobileMenu()
		}
	})

	// Close on escape key
	document.addEventListener('keydown', function (e) {
		if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
			closeMobileMenu()
		}
	})

	// Handle mobile menu link clicks
	const mobileLinks = document.querySelectorAll('.mobile-menu a')
	mobileLinks.forEach(link => {
		link.addEventListener('click', function () {
			closeMobileMenu()

			// Smooth scroll to section if it's an anchor link
			const href = this.getAttribute('href')
			if (href.startsWith('#')) {
				const target = document.querySelector(href)
				if (target) {
					setTimeout(() => {
						target.scrollIntoView({ behavior: 'smooth' })
					}, 300)
				}
			}
		})
	})

	// Touch/swipe support for closing menu
	let startX = 0
	let currentX = 0

	mobileContent.addEventListener('touchstart', function (e) {
		startX = e.touches[0].clientX
	})

	mobileContent.addEventListener('touchmove', function (e) {
		currentX = e.touches[0].clientX
		const diffX = startX - currentX

		if (diffX > 50) {
			// Swipe left to close
			mobileContent.style.transform = `translateX(-${Math.min(diffX, 100)}px)`
		}
	})

	mobileContent.addEventListener('touchend', function (e) {
		const diffX = startX - currentX

		if (diffX > 100) {
			// Swipe threshold
			closeMobileMenu()
		}

		mobileContent.style.transform = ''
	})
}

// Responsive image loading
function loadResponsiveImages() {
	const images = document.querySelectorAll('img')
	images.forEach(img => {
		// Add loading="lazy" for better mobile performance
		if (!img.hasAttribute('loading')) {
			img.setAttribute('loading', 'lazy')
		}

		// Add error handling
		img.addEventListener('error', function () {
			this.style.display = 'none'
		})
	})
}

// Handle orientation changes
window.addEventListener('orientationchange', function () {
	setTimeout(function () {
		// Recalculate viewport height for mobile browsers
		const vh = window.innerHeight * 0.01
		document.documentElement.style.setProperty('--vh', `${vh}px`)
	}, 100)
})

// Initialize responsive features
document.addEventListener('DOMContentLoaded', function () {
	loadResponsiveImages()

	// Set initial viewport height
	const vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty('--vh', `${vh}px`)
})

// Handle window resize
window.addEventListener('resize', function () {
	const vh = window.innerHeight * 0.01
	document.documentElement.style.setProperty('--vh', `${vh}px`)
})

// Add CSS custom property for viewport height
const style = document.createElement('style')
style.textContent = `
    :root {
        --vh: 1vh;
    }
    
    .full-height {
        height: 100vh;
        height: calc(var(--vh, 1vh) * 100);
    }
`
document.head.appendChild(style)
