import React, { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react'
import { clearSignature, getImageSignature, ISignature, Signature } from '..'

const ComponentForStorybook = (props: ISignature) => {

  const [image, setImage] = useState("")

  const click = () => {
    setImage(getImageSignature())
  }

  const clear = () => {
    setImage("")
    clearSignature()
  }

  return (
    <>
      <div style={{ margin: "0 0 10px 0" }}>
        <button onClick={clear}>
          Clear
        </button>
        <button onClick={click}>
          Pegar imagem
        </button>
      </div>
      {image ? <img src={image} alt="desenho" style={{ border: "1px solid red" }}/> : null}
      <Signature {...props} />
    </>
  )
}

const meta: Meta = {
  component: ComponentForStorybook,
  title: "Signature",
}

const divRoot = document.getElementById("storybook-root")
const htmlEl = document.querySelector("html")
const bodyEl = document.querySelector("body")

export default meta

const Template: StoryFn<ISignature> = args => <ComponentForStorybook {...args} />

export const Default = Template.bind({})

Default.args = {
  lineWidth: 5,
  penColor: "green",
  height: "90%",
  width: "100%",
  styles: {
    background: "#ffffff"
  }
}

if (divRoot && divRoot.style) {
  divRoot.style.height = "100%"
  divRoot.style.width = "100%"
  divRoot.style.overflow = "auto"
}
if (bodyEl && bodyEl.style) {
  bodyEl.style.height = "100%"
  bodyEl.style.width = "100%"
  bodyEl.style.overflow = "auto"
}
if (htmlEl && htmlEl.style) {
  htmlEl.style.height = "100vh"
  htmlEl.style.width = "100vw"
  htmlEl.style.overflow = "hidden"
}