'use strict'

import React, { useState } from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import { Stack } from '@strapi/design-system/Stack';
import { Box } from '@strapi/design-system/Box';
import { Typography } from '@strapi/design-system/Typography';
import { useIntl } from 'react-intl';
import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";
import { fetchData } from '../../pages/utils/api';
import { useMutation, useQuery, useQueryClient } from 'react-query';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null, errorInfo: null };
    }
    
    componentDidCatch(error, errorInfo) {
      // Catch errors in any components below and re-render with error message
      this.setState({
        error: error,
        errorInfo: errorInfo
      })
      // You can also log error messages to an error reporting service here
    }
    
    render() {
      if (this.state.errorInfo) {
        // Error path
        return (
          <div>
            <h2>Something went wrong.</h2>
            <details style={{ whiteSpace: 'pre-wrap' }}>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          </div>
        );
      }
      // Normally, just render children
      return this.props.children;
    }  
  }

  
const GoogleGeocoder = ({ name, onChange, value, intlLabel, disabled, error, description, required }) => {
    const { formatMessage } = useIntl();
    const { data } = useQuery('advanced', () => fetchData(),{
        onSuccess: (date) => {
          debugger
        },
        onError: (err) => {
         debugger
        },
      });

    const handleChange = (place) => {
        onChange({
            target: {
                name,
                value: place,
                type: 'string',
            },
        });
    };
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
                {(data && data.googleAPI && data.googleAPI != '') ? (
               <ErrorBoundary>
               <Autocomplete
                    disabled={disabled}
                    apiKey={data.googleAPI}
                    onPlaceSelected={handleChange}
                    inputAutocompleteValue={value}
                />
               </ErrorBoundary>
                ) : (
                    <> <Typography variant="pi" fontWeight="bold" textColor="danger600">{formatMessage({ id: 'setup.google.maps.api.warning', defaultMessage: "Setup google maps API key in the settings page" })}</Typography>
                        <Typography variant="pi">

                            {value}
                        </Typography></>
                )


                }

            </div>

        </Stack>

    )

}

export default GoogleGeocoder