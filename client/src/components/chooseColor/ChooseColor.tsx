import React, { useState } from "react";

import { COLORS } from "../../utils/Constants";
import {
  ColorRadioButtonsContainer,
  ColorCheckmark,
  ColorRadioButton,
  InputRadio,
} from "./style";

interface IChooseColorProps {
  setColor: Function;
}

const ChooseColor: React.FC<IChooseColorProps> = ({setColor}) => {
  const [colorRadioButtons, setColorRadioButtons] = useState(
    COLORS.map((color) => ({
      color,
      isChecked: false,
    }))
  );

  const onRadioSelect = (radioIndex: number) => {
    const newColorRadioButtons = colorRadioButtons.map((RadioButton, index) => {
      const isAlreadyChecked = RadioButton.isChecked;
      const shouldBeChecked = !isAlreadyChecked && radioIndex === index;
      return {
        color: RadioButton.color,
        isChecked: shouldBeChecked,
      };
    });

    if (colorRadioButtons[radioIndex].isChecked) {
      setColor("");
    } else {
      setColor(colorRadioButtons[radioIndex].color);
    }
    setColorRadioButtons(newColorRadioButtons);
  };

  return (
    <ColorRadioButtonsContainer>
      {colorRadioButtons.map((colorRadioButton, index) => (
        <ColorRadioButton
          key={colorRadioButton.color}
          className="choose_colors__container"
        >
          <InputRadio
            name="choose_color"
            type="radio"
            value={colorRadioButton.color}
            onClick={() => onRadioSelect(index)}
            checked={colorRadioButton.isChecked}
          />
          <ColorCheckmark
            className="color_checkmark"
            style={{ backgroundColor: colorRadioButton.color }}
          />
        </ColorRadioButton>
      ))}
    </ColorRadioButtonsContainer>
  );
};
export default ChooseColor
