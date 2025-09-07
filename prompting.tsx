"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const COLOR = "#FFFFFF"
const HIT_COLOR = "#333333"
const BACKGROUND_COLOR = "#000000"
const BALL_COLOR = "#FFFFFF"
const PADDLE_COLORS = ["#FFB3BA", "#BAFFC9", "#BAE1FF", "#FFFFBA"] // Pastel pink, green, blue, yellow
const LETTER_SPACING = 1
const WORD_SPACING = 3

const LOGO_PIXEL_MAP = {
  HTML: [
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
  ],
  CSS: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 0],
    [1, 0, 0, 0, 0],
    [1, 1, 1, 1, 1],
  ],
  JS: [
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 0, 1, 0, 1],
    [0, 1, 1, 1, 0],
  ],
  NEXT: [
    [1, 0, 0, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 0, 0, 0, 0],
  ],
  GIT: [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0],
  ],
  GITHUB: [
    [0, 1, 1, 1, 0],
    [1, 0, 1, 0, 1],
    [1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
  ],
}

const PIXEL_MAP = {
  P: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
  ],
  R: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  O: [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  M: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ],
  T: [
    [1, 1, 1, 1, 1],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  I: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 1, 0],
    [0, 1, 0],
    [1, 1, 1],
  ],
  N: [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 0, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1],
    [1, 0, 0, 0, 1],
  ],
  G: [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0],
    [1, 0, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
  ],
  S: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  A: [
    [0, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  L: [
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  Y: [
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 1, 0, 0],
  ],
  U: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
  ],
  D: [
    [1, 1, 1, 0],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 0],
  ],
  E: [
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
    [1, 0, 0, 0],
    [1, 1, 1, 1],
  ],
  H: [
    [1, 0, 0, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 0, 0, 1],
  ],
  K: [
    [1, 0, 0, 1],
    [1, 0, 1, 0],
    [1, 1, 0, 0],
    [1, 0, 1, 0],
    [1, 0, 0, 1],
  ],
  "&": [
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 0, 0, 0, 1],
  ],
  V: [
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [0, 1, 0, 1, 0],
    [0, 0, 1, 0, 0],
  ],
}

interface Pixel {
  x: number
  y: number
  size: number
  hit: boolean
}

interface Ball {
  x: number
  y: number
  dx: number
  dy: number
  radius: number
}

interface Paddle {
  x: number
  y: number
  width: number
  height: number
  targetY: number
  isVertical: boolean
}

interface Powerup {
  x: number
  y: number
  dy: number
  type: keyof typeof LOGO_PIXEL_MAP
  size: number
  color: string
}

export function PromptingIsAllYouNeed() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pixelsRef = useRef<Pixel[]>([])
  const ballRef = useRef<Ball>({ x: 0, y: 0, dx: 0, dy: 0, radius: 0 })
  const paddlesRef = useRef<Paddle[]>([])
  const powerupsRef = useRef<Powerup[]>([])
  const scaleRef = useRef(1)
  const [activeTab, setActiveTab] = useState<"experience" | "education">("experience")

  const pastelColors = ["#FFB3BA", "#BAE1FF", "#FFFFBA", "#DDA0DD", "#FFE4B5", "#F0E68C"]
  const techColors = ["#FFB3BA", "#BAE1FF", "#FFFFBA", "#DDA0DD", "#FFE4B5"]

   const projectsData = [
    /*{
      id: 1,
      name: "E_COMMERCE_PLATFORM",
      description: "Full-stack e-commerce solution with payment integration and admin dashboard.",
      technologies: ["REACT", "NODE", "STRIPE"],
      liveLink: "#",
      githubLink: "https://github.com/Heet-p/",
      color: pastelColors[0],
    },
    {
      id: 2,
      name: "TASK_MANAGEMENT_APP",
      description: "Collaborative task management tool with real-time updates and team features.",
      technologies: ["NEXT.JS", "SOCKET.IO", "MONGODB"],
      liveLink: "https://taskmanager.heetparikh.me",
      githubLink: "https://github.com/heet-p/task-manager",
      color: pastelColors[1],
    },
    {
      id: 3,
      name: "WEATHER_DASHBOARD",
      description: "Interactive weather dashboard with location-based forecasts and data visualization.",
      technologies: ["VUE", "API", "CHARTS"],
      liveLink: "https://weather-app.heetparikh.me",
      githubLink: "https://github.com/heet-p/weather-dashboard",
      color: pastelColors[2],
    },*/
    {
      id: 1,
      name: "PORTFOLIO_WEBSITE",
      description: "Personal portfolio showcasing projects with interactive animations and responsive design.",
      technologies: ["TYPESCRIPT", "NODEJS", "TAILWIND"],
      liveLink: "https://heetparikh.me",
      githubLink: "https://github.com/Heet-P/Portfolio",
      color: pastelColors[3],
    },
   {
      id: 2,
      name: "GRAVITAS_DRIFT",
      description: "Web Based Aestroid Shooter game with leaderboard and database",
      technologies: ["HTML CANVAS", "JavaScript", "SupaBase"],
      liveLink: "https://gravitas-drift.netlify.app/",
      githubLink: "https://github.com/Heet-P/Gravitas-Drift",
      color: pastelColors[4],
    },
     {
      id: 3,
      name: "Globe_Trotters",
      description: "AI-Powered Website which can help you curate the perfect trips from planning to budgeting.",
      technologies: ["NextJS", "SupaBase"],
      liveLink: "https://drive.google.com/file/d/1I6Gsg4ZwZl7ULV4y6E-1gZ6dEYDqHTW7/view?usp=sharing",
      githubLink: "https://github.com/dhrumil246/GlobeTrotter_Odoo",
      color: pastelColors[5],
    }
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      scaleRef.current = Math.min(canvas.width / 1000, canvas.height / 1000)
      initializeGame()
    }

    const initializeGame = () => {
      const scale = scaleRef.current
      const LARGE_PIXEL_SIZE = 9 * scale
      const SMALL_PIXEL_SIZE = 5 * scale
      const isMobile = window.innerWidth < 768
      const BALL_SPEED = isMobile ? Math.max(2 * scale, 1.5) : 2 * scale

      pixelsRef.current = []
      powerupsRef.current = []
      const words = ["HEET PARIKH", "STUDENT & DEVELOPER"]

      const calculateWordWidth = (word: string, pixelSize: number) => {
        return (
          word.split("").reduce((width, letter) => {
            const letterWidth = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]?.[0]?.length ?? 0
            return width + letterWidth * pixelSize + LETTER_SPACING * pixelSize
          }, 0) -
          LETTER_SPACING * pixelSize
        )
      }

      const totalWidthLarge = calculateWordWidth(words[0], LARGE_PIXEL_SIZE)
      const totalWidthSmall = words[1].split(" ").reduce((width, word, index) => {
        return width + calculateWordWidth(word, SMALL_PIXEL_SIZE) + (index > 0 ? WORD_SPACING * SMALL_PIXEL_SIZE : 0)
      }, 0)
      const totalWidth = Math.max(totalWidthLarge, totalWidthSmall)
      const scaleFactor = (canvas.width * 0.8) / totalWidth

      const adjustedLargePixelSize = LARGE_PIXEL_SIZE * scaleFactor
      const adjustedSmallPixelSize = SMALL_PIXEL_SIZE * scaleFactor

      const largeTextHeight = 5 * adjustedLargePixelSize
      const smallTextHeight = 5 * adjustedSmallPixelSize
      const spaceBetweenLines = 5 * adjustedLargePixelSize
      const totalTextHeight = largeTextHeight + spaceBetweenLines + smallTextHeight

      let startY = (canvas.height - totalTextHeight) / 2

      words.forEach((word, wordIndex) => {
        const pixelSize = wordIndex === 0 ? adjustedLargePixelSize : adjustedSmallPixelSize
        const totalWidth =
          wordIndex === 0
            ? calculateWordWidth(word, adjustedLargePixelSize)
            : words[1].split(" ").reduce((width, w, index) => {
                return (
                  width +
                  calculateWordWidth(w, adjustedSmallPixelSize) +
                  (index > 0 ? WORD_SPACING * adjustedSmallPixelSize : 0)
                )
              }, 0)

        let startX = (canvas.width - totalWidth) / 2

        if (wordIndex === 1) {
          word.split(" ").forEach((subWord) => {
            subWord.split("").forEach((letter) => {
              const pixelMap = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]
              if (!pixelMap) return

              for (let i = 0; i < pixelMap.length; i++) {
                for (let j = 0; j < pixelMap[i].length; j++) {
                  if (pixelMap[i][j]) {
                    const x = startX + j * pixelSize
                    const y = startY + i * pixelSize
                    pixelsRef.current.push({ x, y, size: pixelSize, hit: false })
                  }
                }
              }
              startX += (pixelMap[0].length + LETTER_SPACING) * pixelSize
            })
            startX += WORD_SPACING * adjustedSmallPixelSize
          })
        } else {
          word.split("").forEach((letter) => {
            const pixelMap = PIXEL_MAP[letter as keyof typeof PIXEL_MAP]
            if (!pixelMap) return

            for (let i = 0; i < pixelMap.length; i++) {
              for (let j = 0; j < pixelMap[i].length; j++) {
                if (pixelMap[i][j]) {
                  const x = startX + j * pixelSize
                  const y = startY + i * pixelSize
                  pixelsRef.current.push({ x, y, size: pixelSize, hit: false })
                }
              }
            }
            startX += (pixelMap[0].length + LETTER_SPACING) * pixelSize
          })
        }
        startY += wordIndex === 0 ? largeTextHeight + spaceBetweenLines : 0
      })

      const ballStartX = canvas.width * 0.9
      const ballStartY = canvas.height * 0.1

      ballRef.current = {
        x: ballStartX,
        y: ballStartY,
        dx: -BALL_SPEED,
        dy: BALL_SPEED,
        radius: adjustedLargePixelSize / 2,
      }

      const paddleWidth = adjustedLargePixelSize
      const paddleLength = 10 * adjustedLargePixelSize

      paddlesRef.current = [
        {
          x: 0,
          y: canvas.height / 2 - paddleLength / 2,
          width: paddleWidth,
          height: paddleLength,
          targetY: canvas.height / 2 - paddleLength / 2,
          isVertical: true,
        },
        {
          x: canvas.width - paddleWidth,
          y: canvas.height / 2 - paddleLength / 2,
          width: paddleWidth,
          height: paddleLength,
          targetY: canvas.height / 2 - paddleLength / 2,
          isVertical: true,
        },
        {
          x: canvas.width / 2 - paddleLength / 2,
          y: 0,
          width: paddleLength,
          height: paddleWidth,
          targetY: canvas.width / 2 - paddleLength / 2,
          isVertical: false,
        },
        {
          x: canvas.width / 2 - paddleLength / 2,
          y: canvas.height - paddleWidth,
          width: paddleLength,
          height: paddleWidth,
          targetY: canvas.width / 2 - paddleLength / 2,
          isVertical: false,
        },
      ]
    }

    const createPowerup = (x: number, y: number) => {
      const logoTypes = Object.keys(LOGO_PIXEL_MAP) as (keyof typeof LOGO_PIXEL_MAP)[]
      const randomType = logoTypes[Math.floor(Math.random() * logoTypes.length)]
      const colors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD"]
      const randomColor = colors[Math.floor(Math.random() * colors.length)]

      powerupsRef.current.push({
        x: x,
        y: y,
        dy: 2 * scaleRef.current,
        type: randomType,
        size: 4 * scaleRef.current,
        color: randomColor,
      })
    }

    const updateGame = () => {
      const ball = ballRef.current
      const paddles = paddlesRef.current

      ball.x += ball.dx
      ball.y += ball.dy

      if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
        ball.dy = -ball.dy
      }
      if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
        ball.dx = -ball.dx
      }

      paddles.forEach((paddle) => {
        if (paddle.isVertical) {
          if (
            ball.x - ball.radius < paddle.x + paddle.width &&
            ball.x + ball.radius > paddle.x &&
            ball.y > paddle.y &&
            ball.y < paddle.y + paddle.height
          ) {
            ball.dx = -ball.dx
          }
        } else {
          if (
            ball.y - ball.radius < paddle.y + paddle.height &&
            ball.y + ball.radius > paddle.y &&
            ball.x > paddle.x &&
            ball.x < paddle.x + paddle.width
          ) {
            ball.dy = -ball.dy
          }
        }
      })

      paddles.forEach((paddle) => {
        if (paddle.isVertical) {
          paddle.targetY = ball.y - paddle.height / 2
          paddle.targetY = Math.max(0, Math.min(canvas.height - paddle.height, paddle.targetY))
          paddle.y += (paddle.targetY - paddle.y) * 0.1
        } else {
          paddle.targetY = ball.x - paddle.width / 2
          paddle.targetY = Math.max(0, Math.min(canvas.width - paddle.width, paddle.targetY))
          paddle.x += (paddle.targetY - paddle.x) * 0.1
        }
      })

      pixelsRef.current.forEach((pixel) => {
        if (
          !pixel.hit &&
          ball.x + ball.radius > pixel.x &&
          ball.x - ball.radius < pixel.x + pixel.size &&
          ball.y + ball.radius > pixel.y &&
          ball.y - ball.radius < pixel.y + pixel.size
        ) {
          pixel.hit = true
          createPowerup(pixel.x + pixel.size / 2, pixel.y + pixel.size / 2)
          const centerX = pixel.x + pixel.size / 2
          const centerY = pixel.y + pixel.size / 2
          if (Math.abs(ball.x - centerX) > Math.abs(ball.y - centerY)) {
            ball.dx = -ball.dx
          } else {
            ball.dy = -ball.dy
          }
        }
      })

      powerupsRef.current = powerupsRef.current.filter((powerup) => {
        powerup.y += powerup.dy
        return powerup.y < canvas.height + 50
      })
    }

    const drawGame = () => {
      if (!ctx) return

      ctx.fillStyle = BACKGROUND_COLOR
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      pixelsRef.current.forEach((pixel) => {
        ctx.fillStyle = pixel.hit ? HIT_COLOR : COLOR
        ctx.fillRect(pixel.x, pixel.y, pixel.size, pixel.size)
      })

      ctx.fillStyle = BALL_COLOR
      ctx.beginPath()
      ctx.arc(ballRef.current.x, ballRef.current.y, ballRef.current.radius, 0, Math.PI * 2)
      ctx.fill()

      paddlesRef.current.forEach((paddle, index) => {
        ctx.fillStyle = PADDLE_COLORS[index % PADDLE_COLORS.length]
        ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height)
      })

      powerupsRef.current.forEach((powerup) => {
        const logoMap = LOGO_PIXEL_MAP[powerup.type]
        ctx.fillStyle = powerup.color

        for (let i = 0; i < logoMap.length; i++) {
          for (let j = 0; j < logoMap[i].length; j++) {
            if (logoMap[i][j]) {
              ctx.fillRect(powerup.x + j * powerup.size, powerup.y + i * powerup.size, powerup.size, powerup.size)
            }
          }
        }
      })
    }

    const gameLoop = () => {
      updateGame()
      drawGame()
      requestAnimationFrame(gameLoop)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)
    gameLoop()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="bg-black text-white font-mono">
      <section id="hero" className="relative h-screen overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
          aria-label="HEET PARIKH STUDENT & DEVELOPER: Fullscreen Pong game with pixel text"
        />
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <Button
            onClick={() => scrollToSection("projects")}
            className="bg-white/10 hover:bg-white/20 text-white border border-[#FFB3BA]/50 hover:border-[#FFB3BA] backdrop-blur-md transition-all duration-300 group rounded-full px-8 py-3 shadow-[0_0_20px_rgba(255,179,186,0.3)] hover:shadow-[0_0_30px_rgba(255,179,186,0.6),0_0_60px_rgba(255,179,186,0.3)] hover:scale-105"
          >
            Explore More
            <span className="ml-2 transition-transform duration-300 group-hover:translate-y-1">↓</span>
          </Button>
        </div>
      </section>

      <section id="projects" className="min-h-screen py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 tracking-wider">
            <span className="border-2 border-[#BAFFC9] px-6 py-2 rounded-lg shadow-lg shadow-[#BAFFC9]/20">
              PROJECTS
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, i) => (
              <Card
                key={project.id}
                className="bg-gray-900 border-2 border-[#BAE1FF]/30 hover:border-[#BAE1FF] transition-all duration-300 group rounded-xl overflow-hidden shadow-lg shadow-[#BAE1FF]/10 hover:shadow-[#BAE1FF]/20 hover:shadow-2xl"
              >
                <CardContent className="p-6">
                  <div className="h-48 bg-gray-800 mb-4 flex items-center justify-center border border-[#FFFFBA]/20 group-hover:border-[#FFFFBA]/50 transition-colors rounded-lg">
                    <div className="text-6xl text-gray-600 group-hover:text-gray-400 transition-colors">
                      [{String(project.id).padStart(2, "0")}]
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2" style={{ color: project.color }}>
                    {project.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs rounded-full text-black font-medium"
                        style={{
                          backgroundColor: techColors[techIndex % techColors.length],
                          border: `1px solid ${techColors[techIndex % techColors.length]}40`,
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => window.open(project.liveLink, "_blank")}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-[#FFB3BA]/50 hover:border-[#FFB3BA] backdrop-blur-md transition-all duration-300 rounded-lg text-xs font-bold shadow-lg shadow-[#FFB3BA]/10 hover:shadow-[#FFB3BA]/20"
                    >
                      SEE_LIVE
                    </Button>
                    <Button
                      onClick={() => window.open(project.githubLink, "_blank")}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white border border-[#BAE1FF]/50 hover:border-[#BAE1FF] backdrop-blur-md transition-all duration-300 rounded-lg text-xs font-bold shadow-lg shadow-[#BAE1FF]/10 hover:shadow-[#BAE1FF]/20"
                    >
                      GITHUB
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="min-h-screen py-20 px-8 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 tracking-wider">
            <span className="border-2 border-[#BAE1FF] px-6 py-2 rounded-lg shadow-lg shadow-[#BAE1FF]/20">
              ABOUT_ME
            </span>
          </h2>

          <div className="flex justify-center mb-12">
            <div className="relative bg-gray-800/80 p-1 rounded-xl border-2 border-[#FFB3BA]/50 backdrop-blur-sm shadow-lg shadow-[#FFB3BA]/20">
              <div
                className={`absolute top-1 h-10 bg-gradient-to-r from-[#FFB3BA] via-[#FF6B9D] to-[#BAE1FF] rounded-lg transition-all duration-500 shadow-lg ${
                  activeTab === "experience"
                    ? "left-1 w-[120px] shadow-[#FFB3BA]/50"
                    : "left-[122px] w-[100px] shadow-[#BAE1FF]/50"
                }`}
                style={{
                  boxShadow:
                    activeTab === "experience"
                      ? "0 0 20px rgba(255, 179, 186, 0.6), inset 0 0 20px rgba(255, 179, 186, 0.2)"
                      : "0 0 20px rgba(186, 225, 255, 0.6), inset 0 0 20px rgba(186, 225, 255, 0.2)",
                }}
              />
              <div className="relative flex">
                <button
                  onClick={() => setActiveTab("experience")}
                  className={`px-4 py-2 text-sm font-bold transition-all duration-300 rounded-lg ${
                    activeTab === "experience" ? "text-white drop-shadow-lg" : "text-gray-400 hover:text-white"
                  }`}
                  style={{ width: "120px" }}
                >
                  EXPERIENCE
                </button>
                <button
                  onClick={() => setActiveTab("education")}
                  className={`px-4 py-2 text-sm font-bold transition-all duration-300 rounded-lg ${
                    activeTab === "education" ? "text-white drop-shadow-lg" : "text-gray-400 hover:text-white"
                  }`}
                  style={{ width: "100px" }}
                >
                  EDUCATION
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {activeTab === "experience" ? (
              <div className="space-y-6">
                <div className="border border-[#FFB3BA]/30 hover:border-[#FFB3BA] p-6 transition-all duration-300 rounded-xl shadow-lg shadow-[#FFB3BA]/10 hover:shadow-[#FFB3BA]/20 hover:shadow-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[#FFB3BA]">Freelance FrontEnd Developer</h3>
                    <span className="text-gray-400 text-sm">2024 - Present</span>
                  </div>
                  <p className="text-gray-300 mb-4">Team Echo</p>
                  <ul className="text-gray-400 space-y-2">
                    <li>• Developed responsive web applications using React and Next.js</li>
                    <li>• Collaborated with teams to implement pixel-perfect UI components</li>
                    <li>• Optimized application performance and implemented modern CSS frameworks</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="border border-[#FFFFBA]/30 hover:border-[#FFFFBA] p-6 transition-all duration-300 rounded-xl shadow-lg shadow-[#FFFFBA]/10 hover:shadow-[#FFFFBA]/20 hover:shadow-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[#FFFFBA]">HIGH_SCHOOL</h3>
                    <span className="text-gray-400 text-sm">2021 - 2024</span>
                  </div>
                  <p className="text-gray-300 mb-4">Gujarat Public School - CBSE</p>
                  <ul className="text-gray-400 space-y-2">
                    <li>• Graduated with Honors (Finals: 91%)</li>
                    <li>• Won multiple State Level Physics competitions</li>
                    <li>• School Gold Medalist - International Maths Olympiad </li>
                    <li>• Presented Physics project to ISRO-Chairman</li>
                  </ul>
                </div>

                <div className="border border-[#DDA0DD]/30 hover:border-[#DDA0DD] p-6 transition-all duration-300 rounded-xl shadow-lg shadow-[#DDA0DD]/10 hover:shadow-[#DDA0DD]/20 hover:shadow-2xl">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[#DDA0DD]">BTech-Computer Science & Engineering</h3>
                    <span className="text-gray-400 text-sm">2024 - Present</span>
                  </div>
                  <p className="text-gray-300 mb-4">CHARUSAT</p>
                  <ul className="text-gray-400 space-y-2">
                    <li>• Bachelor of Science in Computer Science (Current CGPA: 8.8/10.0)</li>
                    <li>• Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems</li>
                    <li>• Technincal Lead for Git/GitHub Club.</li>
                    <li>• Expected graduation: June 2028</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen py-20 px-8 flex items-center">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl font-bold text-center mb-16 tracking-wider">
            <span className="border-2 border-[#FFFFBA] px-6 py-2 rounded-lg shadow-lg shadow-[#FFFFBA]/20">
              CONTACT_ME
            </span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="border border-[#BAFFC9]/30 p-6 rounded-xl shadow-lg shadow-[#BAFFC9]/10">
                <h3 className="text-xl font-bold mb-4 text-[#BAFFC9]">GET_IN_TOUCH</h3>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-center space-x-4">
                    <span className="w-20 text-gray-500">EMAIL:</span>
                    <span>heet16@gmail.com</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="w-20 text-gray-500">PHONE:</span>
                    <span>+91 9227011606 </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <a href="https://github.com/Heet-P"><span className="w-20 text-gray-500">GITHUB: <span className="text-white">@Heet-P</span></span></a>
  
                  </div>
                  <div className="flex items-center space-x-4">
                  <a href="https://www.linkedin.com/in/heetparikh/"><span className="w-20 text-gray-500">LINKEDIN: <span className="text-white">@Heet Parikh</span></span></a>

                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="border border-[#FFB3BA]/30 p-6 rounded-xl shadow-lg shadow-[#FFB3BA]/10">
              <h3 className="text-xl font-bold mb-6 text-[#FFB3BA]">SEND_MESSAGE</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="NAME"
                    className="w-full bg-gray-900 border border-[#BAE1FF]/30 focus:border-[#BAE1FF] p-3 text-white placeholder-gray-500 focus:outline-none rounded-lg transition-colors"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="EMAIL"
                    className="w-full bg-gray-900 border border-[#BAE1FF]/30 focus:border-[#BAE1FF] p-3 text-white placeholder-gray-500 focus:outline-none rounded-lg transition-colors"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="MESSAGE"
                    rows={5}
                    className="w-full bg-gray-900 border border-[#BAE1FF]/30 focus:border-[#BAE1FF] p-3 text-white placeholder-gray-500 focus:outline-none resize-none rounded-lg transition-colors"
                  />
                </div>
                <Button className="w-full bg-white text-black hover:bg-gray-200 font-bold py-3 rounded-lg transition-colors">
                  SEND_MESSAGE
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PromptingIsAllYouNeed
