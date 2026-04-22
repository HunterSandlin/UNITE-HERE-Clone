import { useState } from 'react';
import {
    Box,
    Typography,
    Select,
    MenuItem,
    Autocomplete,
    TextField,
    IconButton
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { fontFamily, brandColors } from 'src/styles/theme';
import defaultAffiliateData from 'src/mockData/affiliatedata.json';

const findAffiliateStyles = {
    root: {
        backgroundColor: brandColors.backgroundGrey,
        paddingTop: '55px',
        paddingBottom: '50px',
        paddingLeft: { xs: '1.5rem', md: '50px' },
        paddingRight: { xs: '1.5rem', md: '50px' }
    },
    innerGrid: {
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: '2rem', md: '3rem' },
        alignItems: { xs: 'flex-start', md: 'center' },
        paddingBottom: '2rem'
    },
    leftPanel: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem'
    },
    heading: {
        color: brandColors.redLight,
        fontWeight: 400,
        fontSize: { xs: '1.5rem', md: '1.75rem' },
        lineHeight: 1.25,
        fontFamily
    },
    description: {
        color: '#333',
        fontSize: '1rem',
        lineHeight: 1.65,
        fontFamily
    },
    centerPanel: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    label: {
        fontWeight: 700,
        fontSize: '1.1rem',
        color: '#1a1a1a',
        fontFamily
    },
    select: {
        fontFamily,
        fontSize: '0.9rem',
        backgroundColor: '#fff',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ccc'
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#aaa'
        }
    },
    rightPanel: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    searchRow: {
        display: 'flex',
        alignItems: 'center',
        gap: 0
    },
    autocomplete: {
        flex: 1,
        backgroundColor: '#fff',
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#ccc',
            borderRight: 'none'
        }
    },
    searchButton: {
        backgroundColor: brandColors.redLight,
        color: '#fff',
        borderRadius: 0,
        height: '56px',
        width: '48px',
        flexShrink: 0,
        '&:hover': {
            backgroundColor: brandColors.redDark
        }
    }
};

const FindAffiliate = () => {
    const { t: tCommon } = useTranslation('common');
    const { t: tStates } = useTranslation('states');
    const [selectedState, setSelectedState] = useState('');
    const [selectedAffiliate, setSelectedAffiliate] = useState('');
    // Will eventually come from API
    const [affiliateData, setAffiliataData] = useState(defaultAffiliateData.affiliates);

    // Turns affiliate data into usable array for drop down
    const createDropdownOptions = (data) => {
        const statesMap = {};

        // Process each item in the data array
        data.forEach((local) => {
            const label = local.state;
            if (statesMap[label]) {
                statesMap[label].count++;
            } else {
                statesMap[label] = {
                    label: label,
                    count: 1
                };
            }
        });

        // Convert the map values to an array and sort by label
        const formattedStates = Object.values(statesMap).sort((a, b) =>
            a.label.localeCompare(b.label)
        );

        return formattedStates;
    };

    const states = createDropdownOptions(affiliateData);

    // Filter autocomplete options by selected state if one is chosen
    const filteredAffiliates = selectedState
        ? affiliateData.filter((a) => a.state === selectedState)
        : affiliateData;

    const handleSearch = (e) => {
        // does nothing for now, eventually will have logic for searching on new page
        // Original page's logic is unexpect, might have to modify
        // console.log('event: ', e);
    };

    return (
        <Box sx={findAffiliateStyles.root}>
            <Box sx={findAffiliateStyles.innerGrid}>
                {/* Title and Description */}
                <Box sx={findAffiliateStyles.leftPanel}>
                    <Typography component="h2" sx={findAffiliateStyles.heading}>
                        {tCommon('findAffiliate.title')}
                    </Typography>
                    <Typography sx={findAffiliateStyles.description}>
                        {tCommon('findAffiliate.description')}
                    </Typography>
                </Box>

                {/* Dropdown */}
                <Box sx={findAffiliateStyles.centerPanel}>
                    <Typography component="label" sx={findAffiliateStyles.label}>
                        {tCommon('findAffiliate.stateLabel')}
                    </Typography>
                    <Select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        displayEmpty
                        sx={findAffiliateStyles.select}
                        size="medium">
                        {states.map((s) => (
                            <MenuItem key={s.label} value={s.label}>
                                {`${tStates(s.label)} (${s.count})`}
                            </MenuItem>
                        ))}
                    </Select>
                </Box>

                {/* Autocomplete */}
                <Box sx={findAffiliateStyles.rightPanel}>
                    <Typography component="label" sx={findAffiliateStyles.label}>
                        {tCommon('findAffiliate.cityLabel')}
                    </Typography>
                    <Box sx={findAffiliateStyles.searchRow}>
                        <Autocomplete
                            options={filteredAffiliates}
                            getOptionLabel={(option) => option?.label || ''}
                            value={selectedAffiliate}
                            onChange={(_, newValue) => setSelectedAffiliate(newValue)}
                            sx={findAffiliateStyles.autocomplete}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    placeholder={tCommon('findAffiliate.searchPlaceholder')}
                                />
                            )}
                        />
                        <IconButton
                            onClick={handleSearch}
                            color="inherit"
                            href="who-we-are/affiliates/"
                            aria-label={tCommon('findAffiliate.searchAriaLabel')}
                            sx={findAffiliateStyles.searchButton}>
                            <ArrowForwardIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default FindAffiliate;
