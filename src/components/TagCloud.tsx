import React, { useEffect, useState, useRef } from "react"
import { CeobeResponseType, DataSourceType } from "@site/src/types"
import "@site/src/css/datasource_cloud.css"

const TagCloud = () => {
  const [allDataSource, setAllDataSource] = useState<DataSourceType[]>([])
  const tagBallRef: React.MutableRefObject<HTMLDivElement> = useRef(null)
  const tagElems: HTMLElement[] = []
  const RADIUS = 300
  const fallLength = 500

  const headers = new Headers()
  headers.append("User-Agent", "CeobeCanteen/Blog")

  const requestOptions = {
    method: "GET",
    headers: headers,
  }

  useEffect(() => {
    fetch("/api/v1/canteen/config/datasource/list", requestOptions)
      .then((response) => response.json())
      .then((result: CeobeResponseType<DataSourceType[]>) => {
        console.log(result.data)
        setAllDataSource(result.data)
      })
      .catch((error) => console.log("error", error))
  }, [])

  useEffect(() => {
    const tagBallElem = tagBallRef.current
    console.log("tagBallElem")
    console.log(tagBallElem)
    console.log("tagElems")
    console.log(tagElems)
    const tags = []
    let angleX = Math.PI / 300
    let angleY = Math.PI / 300
    const CX = tagBallElem.offsetWidth / 2
    const CY = tagBallElem.offsetHeight / 2

    class Tag {
      elem: HTMLElement
      x: number
      y: number
      z: number

      constructor(elem: HTMLElement, x: number, y: number, z: number) {
        this.elem = elem
        this.x = x
        this.y = y
        this.z = z
        this.setColor()
      }

      setColor(color: string = null) {
        if (color) {
          this.elem.style.color = color
          return
        }
        let i = Math.round(Math.random() * 255)
        let j = Math.round(Math.random() * 255)
        let k = Math.round(Math.random() * 255)
        this.elem.style.color = `rgb(${i},${j},${k})`
      }

      move() {
        let scale = fallLength / (fallLength - this.z)
        let alpha = (this.z + RADIUS) / (2 * RADIUS)
        this.elem.style.fontSize = `${15 * scale}px`
        this.elem.style.opacity = (alpha + 0.5).toString()
        this.elem.style.zIndex = Math.ceil(scale * 100).toString()
        this.elem.style.left = `${this.x + CX - this.elem.offsetWidth / 2}px`
        this.elem.style.top = `${this.y + CY - this.elem.offsetHeight / 2}px`
      }
    }

    const init = () => {
      console.log("called init")
      tagBallElem.addEventListener("mousemove", (event) => {
        let x = event.clientX - tagBallElem.offsetLeft - CX
        let y = event.clientY - tagBallElem.offsetTop - CY
        angleY = x * 0.0001
        angleX = y * 0.0001
      })
    }

    const initBall = () => {
      console.log("called initBall")
      tagElems.forEach((tag, i) => {
        let k = (2 * (i + 1) - 1) / tagElems.length - 1
        let a = Math.acos(k)
        let b = a * Math.sqrt(tagElems.length * Math.PI)
        let x = RADIUS * Math.sin(a) * Math.cos(b)
        let y = RADIUS * Math.sin(a) * Math.sin(b)
        let z = RADIUS * Math.cos(a)
        let t = new Tag(tag, x, y, z)
        tags.push(t)
        t.move()
      })
    }

    const rotateX = () => {
      let cos = Math.cos(angleX)
      let sin = Math.sin(angleX)
      tags.forEach((tag) => {
        let y1 = tag.y * cos - tag.z * sin
        let z1 = tag.z * cos + tag.y * sin
        tag.y = y1
        tag.z = z1
      })
    }

    const rotateY = () => {
      let cos = Math.cos(angleY)
      let sin = Math.sin(angleY)
      tags.forEach((tag) => {
        let x1 = tag.x * cos - tag.z * sin
        let z1 = tag.z * cos + tag.x * sin
        tag.x = x1
        tag.z = z1
      })
    }

    const animate = () => {
      console.log("called animate")
      setInterval(() => {
        rotateX()
        rotateY()
        tags.map((tag) => tag.move())
      }, 51)
    }

    init()
    initBall()
    animate()
  }, [tagElems.length === allDataSource.length])

  return (
    <>
      {allDataSource.length === 0 ? <h2>加载中...</h2> : null}
      <div ref={tagBallRef} className="tagBall">
        {allDataSource.map((dataSource, index) => {
          return (
            <a
              key={index.toString()}
              ref={(el) => {
                tagElems.push(el)
                console.log(el)
              }}
              className="tag"
              target="_blank"
              href={dataSource.jump_url}
            >
              {dataSource.nickname}
            </a>
          )
        })}
      </div>
    </>
  )
}

export default TagCloud
