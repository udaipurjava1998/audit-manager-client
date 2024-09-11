import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Box, Grid, Card, CardContent } from '@mui/material';
import ArgonBox from '../../../components/ArgonBox';
import typography from '../../../assets/theme/base/typography';
import borders from '../../../assets/theme/base/borders';
import ArgonTypography from '../../../components/ArgonTypography';
import ArgonButton from '../../../components/ArgonButton';

function SubTable({ subData, gridSize = { xs: 8 }, title = "History"}) {
    var paddingSize = '5px'

    const { size, fontWeightBold } = typography;
    const { borderWidth } = borders;
    const getHeaderColumn = (headerName, align) => {
        return (
            <ArgonBox
                component="th"
                width="auto"
                pt={1.5}
                pb={1.25}
                pl={3}
                pr={3}
                textAlign={align}
                fontSize={size.sm}
                fontWeight={fontWeightBold}
                color="secondary"
                opacity={0.7}
                sx={({ palette: { light }, borders: { borderWidth } }) => ({
                    borderBottom: `${borderWidth[1]} solid ${light.main}`,
                })}
            >
                {headerName}
            </ArgonBox>
        );
    };


    return (
        <>
            <Grid
                container
                direction="row"
                sx={{
                    justifyContent: "flex-end",
                    alignItems: "center",
                }}
            >


                <Grid item xs={gridSize.xs}>
                    <Card>
                        <CardContent>
                          {title &&  <Grid container
                                direction="row"
                                sx={{
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                }}>
                                <Typography variant='h5' px={3} >{title}</Typography>
                               
                            </Grid> }
                            <Table sx={{ minWidth: 100 }} aria-label="simple table">
                                <TableBody sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableRow>
                                        {getHeaderColumn('Attribute Name', 'left')}
                                        {getHeaderColumn('Old Value', 'center')}
                                        {getHeaderColumn('New Value', 'center')}
                                        {getHeaderColumn('Changed By', 'center')}


                                    </TableRow>
                                    {subData && subData.map((item, index) => {
                                        console.log(`${item.oldValue} :: ${item.newValue}`)
                                        const isChanged = item.oldValue !== item.newValue;

                                        return (
                                            <TableRow key={index} hover sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                <TableCell sx={{ padding: paddingSize, textAlign: 'left' }}>
                                                    <ArgonTypography px={4} variant="caption" color="secondary" fontWeight="medium">
                                                        {item.attributeName.toUpperCase()}
                                                    </ArgonTypography>
                                                </TableCell>
                                                <TableCell sx={{ padding: paddingSize, textAlign: 'center' }}>
                                                    <ArgonTypography px={4} variant="caption" color={isChanged ? "warning" : "secondary"} fontWeight="medium">
                                                        {item.oldValue}
                                                    </ArgonTypography>
                                                </TableCell>
                                                <TableCell sx={{ padding: paddingSize, textAlign: 'center' }}>
                                                    <ArgonTypography px={4} variant="caption" color={isChanged ? "success" : "secondary"} fontWeight="medium">
                                                        {item.newValue}
                                                    </ArgonTypography>
                                                </TableCell>
                                                <TableCell sx={{ padding: paddingSize, textAlign: 'center' }}>
                                                    <ArgonTypography px={4} variant="caption" color="secondary" fontWeight="medium">
                                                        {item.changedBy}
                                                    </ArgonTypography>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}

                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </>
    );
}

export default SubTable;
