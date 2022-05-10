'use strict'

import React, { useState } from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import { Stack } from '@strapi/design-system/Stack';
import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import { useIntl } from 'react-intl';
function hexToRgbA(rgbStr) {
    if (/\d+\.?\d*/g.test(rgbStr)) {
        let rgbInt = Array.from(rgbStr.matchAll(/\d+\.?\d*/g), c => +c[0])

        return {
            r: rgbInt[0],
            g: rgbInt[1],
            b: rgbInt[2],
            a: rgbInt[3],
        }
    }
    console.log('cannot read input color')
    return {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
    }
}

const ColorPicker = ({ name, onChange, value, intlLabel, disabled, error, description, required }) => {
    const { formatMessage } = useIntl();

    const [selectedColor, setSelectedColor] = useState(hexToRgbA(value))
    const [displayColorPicker, setDisplayColorPicker] = useState(false)

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker)
    };

    const handleClose = () => {
        setDisplayColorPicker(false)
    };

    const handleChange = (color) => {
        // color = {
        //   hex: '#333',
        //   rgb: {
        //     r: 51,
        //     g: 51,
        //     b: 51,
        //     a: 1,
        //   },
        //   hsl: {
        //     h: 0,
        //     s: 0,
        //     l: .20,
        //     a: 1,
        //   },
        // }
        setSelectedColor(color.rgb);
        onChange({
            target: {
                name,
                value: color.hex,
                type: 'string',
            },
        });
    };



    const styles = reactCSS({
        'default': {
            color: {
                width: '36px',
                height: '14px',
                borderRadius: '2px',
                background: `rgba(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}, ${selectedColor.a})`,
            },
            swatch: {
                padding: '5px',
                background: '#fff',
                borderRadius: '1px',
                boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
                display: 'inline-block',
                cursor: 'pointer',
            },
            popover: {
                position: 'absolute',
                zIndex: '2',
            },
            cover: {
                position: 'fixed',
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px',
            },
        },
    });

    return (
        <Stack size={1}>
            <Box>
                <Typography variant="pi" fontWeight="bold">
                    {formatMessage(intlLabel)}
                </Typography>
                {required &&
                    <Typography variant="pi" fontWeight="bold" textColor="danger600">*</Typography>
                }
            </Box>
            {error &&
                <Typography variant="pi" textColor="danger600">
                    {formatMessage({ id: error, defaultMessage: error })}
                </Typography>
            }
            {description &&
                <Typography variant="pi">
                    {formatMessage(description)}
                </Typography>
            }
            <div>
                <div style={styles.swatch} onClick={handleClick}>
                    <div style={styles.color} />
                </div>
                {displayColorPicker ? <div style={styles.popover}>
                    <div style={styles.cover} onClick={handleClose} />
                    <SketchPicker disabled color={selectedColor} onChange={handleChange} />
                </div> : null}

            </div>

        </Stack>

    )

}

export default ColorPicker