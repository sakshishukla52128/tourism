import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { QRCodeSVG as QRCode } from 'qrcode.react';
import './Booking.css';

// List of valid international destinations with their metadata
const VALID_DESTINATIONS = {
  // Domestic destinations (India)
  domestic: [
    { id: 'goa', name: 'Goa', country: 'India', type: 'beach' },
    { id: 'manali', name: 'Manali', country: 'India', type: 'hill station' },
    { id: 'jaipur', name: 'Jaipur', country: 'India', type: 'heritage' },
    { id: 'kerala', name: 'Kerala', country: 'India', type: 'backwaters' },
    { id: 'varanasi', name: 'Varanasi', country: 'India', type: 'spiritual' },
    { id: 'shimla', name: 'Shimla', country: 'India', type: 'hill station' },
    { id: 'mumbai', name: 'Mumbai', country: 'India', type: 'metropolitan' },
    { id: 'delhi', name: 'Delhi', country: 'India', type: 'capital' },
    { id: 'bangalore', name: 'Bangalore', country: 'India', type: 'tech hub' },
    { id: 'chennai', name: 'Chennai', country: 'India', type: 'coastal' },
    { id: 'hyderabad', name: 'Hyderabad', country: 'India', type: 'heritage' },
    { id: 'kolkata', name: 'Kolkata', country: 'India', type: 'cultural' },
    { id: 'udaipur', name: 'Udaipur', country: 'India', type: 'royal' },
    { id: 'jodhpur', name: 'Jodhpur', country: 'India', type: 'desert' },
    { id: 'amritsar', name: 'Amritsar', country: 'India', type: 'religious' },
    { id: 'darjeeling', name: 'Darjeeling', country: 'India', type: 'tea gardens' },
    { id: 'ooty', name: 'Ooty', country: 'India', type: 'hill station' },
    { id: 'munnar', name: 'Munnar', country: 'India', type: 'tea plantations' },
    { id: 'kochi', name: 'Kochi', country: 'India', type: 'coastal' },
    { id: 'pondicherry', name: 'Pondicherry', country: 'India', type: 'french colony' },
    { id: 'ahmedabad', name: 'Ahmedabad', country: 'India', type: 'heritage' },
    { id: 'pune', name: 'Pune', country: 'India', type: 'educational' },
    { id: 'agra', name: 'Agra', country: 'India', type: 'historical' },
    { id: 'rann-of-kutch', name: 'Rann of Kutch', country: 'India', type: 'desert' },
    { id: 'leh-ladakh', name: 'Leh-Ladakh', country: 'India', type: 'mountain' },
    { id: 'srinagar', name: 'Srinagar', country: 'India', type: 'lake' },
    { id: 'andaman', name: 'Andaman', country: 'India', type: 'island' },
    { id: 'mysore', name: 'Mysore', country: 'India', type: 'royal' },
    { id: 'khajuraho', name: 'Khajuraho', country: 'India', type: 'temple' },
    { id: 'ajanta-ellora', name: 'Ajanta & Ellora', country: 'India', type: 'caves' },
    { id: 'munnar', name: 'Munnar', country: 'India', type: 'other destination' },
{ id: 'kochi', name: 'Kochi', country: 'India', type: 'other destination' },
{ id: 'pondicherry', name: 'Pondicherry', country: 'India', type: 'other destination' },
{ id: 'ahmedabad', name: 'Ahmedabad', country: 'India', type: 'other destination' },
{ id: 'pune', name: 'Pune', country: 'India', type: 'other destination' },
{ id: 'agra', name: 'Agra', country: 'India', type: 'other destination' },
{ id: 'rann-of-kutch', name: 'Rann of Kutch', country: 'India', type: 'other destination' },
{ id: 'leh-ladakh', name: 'Leh-Ladakh', country: 'India', type: 'other destination' },
{ id: 'srinagar', name: 'Srinagar', country: 'India', type: 'other destination' },
{ id: 'andaman', name: 'Andaman', country: 'India', type: 'other destination' },
{ id: 'mysore', name: 'Mysore', country: 'India', type: 'other destination' },
{ id: 'khajuraho', name: 'Khajuraho', country: 'India', type: 'other destination' },
{ id: 'ajanta-ellora', name: 'Ajanta & Ellora', country: 'India', type: 'other destination' },
{ id: 'munnar', name: 'Munnar', country: 'India', type: 'other destinations' },
    { id: 'kochi', name: 'Kochi', country: 'India', type: 'other destinations' },
    { id: 'pondicherry', name: 'Pondicherry', country: 'India', type: 'other destinations' },
    { id: 'ahmedabad', name: 'Ahmedabad', country: 'India', type: 'other destinations' },
    { id: 'pune', name: 'Pune', country: 'India', type: 'other destinations' },
    { id: 'agra', name: 'Agra', country: 'India', type: 'other destinations' },
    { id: 'rann-of-kutch', name: 'Rann of Kutch', country: 'India', type: 'other destinations' },
    { id: 'leh-ladakh', name: 'Leh-Ladakh', country: 'India', type: 'other destinations' },
    { id: 'srinagar', name: 'Srinagar', country: 'India', type: 'other destinations' },
    { id: 'andaman', name: 'Andaman', country: 'India', type: 'other destinations' },
    { id: 'mysore', name: 'Mysore', country: 'India', type: 'other destinations' },
    { id: 'khajuraho', name: 'Khajuraho', country: 'India', type: 'other destinations' },
    { id: 'ajanta-ellora', name: 'Ajanta & Ellora', country: 'India', type: 'other destinations' },

  { id: 'munnar', name: 'Munnar', country: 'India', type: 'other destinations' },
  { id: 'kochi', name: 'Kochi', country: 'India', type: 'other destinations' },
  { id: 'pondicherry', name: 'Pondicherry', country: 'India', type: 'other destinations' },
  { id: 'ahmedabad', name: 'Ahmedabad', country: 'India', type: 'other destinations' },
  { id: 'pune', name: 'Pune', country: 'India', type: 'other destinations' },
  { id: 'agra', name: 'Agra', country: 'India', type: 'other destinations' },
  { id: 'rann-of-kutch', name: 'Rann of Kutch', country: 'India', type: 'other destinations' },
  { id: 'leh-ladakh', name: 'Leh-Ladakh', country: 'India', type: 'other destinations' },
  { id: 'srinagar', name: 'Srinagar', country: 'India', type: 'other destinations' },
  { id: 'andaman', name: 'Andaman', country: 'India', type: 'other destinations' },
  { id: 'mysore', name: 'Mysore', country: 'India', type: 'other destinations' },
  { id: 'khajuraho', name: 'Khajuraho', country: 'India', type: 'other destinations' },
  { id: 'ajanta-ellora', name: 'Ajanta & Ellora', country: 'India', type: 'other destinations' },
    { id: 'munnar', name: 'Munnar', country: 'India', type: 'other' },
  { id: 'kochi', name: 'Kochi', country: 'India', type: 'other' },
  { id: 'pondicherry', name: 'Pondicherry', country: 'India', type: 'other' },
  { id: 'ahmedabad', name: 'Ahmedabad', country: 'India', type: 'other' },
  { id: 'pune', name: 'Pune', country: 'India', type: 'other' },
  { id: 'agra', name: 'Agra', country: 'India', type: 'other' },
  { id: 'rann-of-kutch', name: 'Rann of Kutch', country: 'India', type: 'other' },
  { id: 'leh-ladakh', name: 'Leh-Ladakh', country: 'India', type: 'other' },
  { id: 'srinagar', name: 'Srinagar', country: 'India', type: 'other' },
  { id: 'andaman', name: 'Andaman', country: 'India', type: 'other' },
  { id: 'mysore', name: 'Mysore', country: 'India', type: 'other' },
  { id: 'khajuraho', name: 'Khajuraho', country: 'India', type: 'other' },
  { id: 'ajanta-ellora', name: 'Ajanta & Ellora', country: 'India', type: 'other' },
  { id: 'shimla', name: 'Shimla', country: 'India', type: 'hill station' },  
{ id: 'manali', name: 'Manali', country: 'India', type: 'adventure' },  
{ id: 'jaipur', name: 'Jaipur', country: 'India', type: 'royal' },  
{ id: 'udaipur', name: 'Udaipur', country: 'India', type: 'lake city' },  
{ id: 'jodhpur', name: 'Jodhpur', country: 'India', type: 'forts' },  
{ id: 'varanasi', name: 'Varanasi', country: 'India', type: 'spiritual' },  
{ id: 'amritsar', name: 'Amritsar', country: 'India', type: 'religious' },  
{ id: 'goa', name: 'Goa', country: 'India', type: 'beaches' },  
{ id: 'hyderabad', name: 'Hyderabad', country: 'India', type: 'heritage' },  
{ id: 'chennai', name: 'Chennai', country: 'India', type: 'coastal' },  
{ id: 'kolkata', name: 'Kolkata', country: 'India', type: 'cultural' },  
{ id: 'bengaluru', name: 'Bengaluru', country: 'India', type: 'tech city' },  
{ id: 'lucknow', name: 'Lucknow', country: 'India', type: 'nawabi' },  
{ id: 'bhopal', name: 'Bhopal', country: 'India', type: 'lakes' },  
{ id: 'patna', name: 'Patna', country: 'India', type: 'historical' },  
{ id: 'gangtok', name: 'Gangtok', country: 'India', type: 'mountain' },  
{ id: 'guwahati', name: 'Guwahati', country: 'India', type: 'river city' },  
{ id: 'chandigarh', name: 'Chandigarh', country: 'India', type: 'planned city' },  
{ id: 'ooty', name: 'Ooty', country: 'India', type: 'hill station' },  
{ id: 'madurai', name: 'Madurai', country: 'India', type: 'temple town' },  
{ id: 'kanpur', name: 'Kanpur', country: 'India', type: 'industrial' },  
{ id: 'nagpur', name: 'Nagpur', country: 'India', type: 'orange city' },  
{ id: 'kozhikode', name: 'Kozhikode', country: 'India', type: 'coastal' },  
{ id: 'shillong', name: 'Shillong', country: 'India', type: 'scenic' },  
{ id: 'dehradun', name: 'Dehradun', country: 'India', type: 'valley' },  
{ id: 'haridwar', name: 'Haridwar', country: 'India', type: 'holy city' },  
{ id: 'rishikesh', name: 'Rishikesh', country: 'India', type: 'yoga capital' },  
{ id: 'dharamshala', name: 'Dharamshala', country: 'India', type: 'tibetan' },  
{ id: 'ajmer', name: 'Ajmer', country: 'India', type: 'pilgrimage' },  
{ id: 'pushkar', name: 'Pushkar', country: 'India', type: 'desert town' },  
{ id: 'kanyakumari', name: 'Kanyakumari', country: 'India', type: 'southern tip' },  
{ id: 'coorg', name: 'Coorg', country: 'India', type: 'coffee plantations' },  
{ id: 'alleppey', name: 'Alleppey', country: 'India', type: 'backwaters' },  
{ id: 'kodaikanal', name: 'Kodaikanal', country: 'India', type: 'hill station' },  
{ id: 'mahabaleshwar', name: 'Mahabaleshwar', country: 'India', type: 'hill station' },  
{ id: 'lonavala', name: 'Lonavala', country: 'India', type: 'hill station' },  
{ id: 'nainital', name: 'Nainital', country: 'India', type: 'lake town' },  
{ id: 'mussoorie', name: 'Mussoorie', country: 'India', type: 'hill station' },  
{ id: 'ranthambore', name: 'Ranthambore', country: 'India', type: 'wildlife' },  
{ id: 'sunderbans', name: 'Sunderbans', country: 'India', type: 'mangroves' },  
{ id: 'kaziranga', name: 'Kaziranga', country: 'India', type: 'wildlife' },  
{ id: 'meghalaya', name: 'Meghalaya', country: 'India', type: 'rainforests' },  
{ id: 'araku-valley', name: 'Araku Valley', country: 'India', type: 'scenic' },  
{ id: 'ziro', name: 'Ziro', country: 'India', type: 'tribal' },  
{ id: 'tawang', name: 'Tawang', country: 'India', type: 'monastery' },  
{ id: 'purulia', name: 'Purulia', country: 'India', type: 'tribal art' },  
{ id: 'hampi', name: 'Hampi', country: 'India', type: 'ruins' },  
{ id: 'badami', name: 'Badami', country: 'India', type: 'caves' },  
{ id: 'gokarna', name: 'Gokarna', country: 'India', type: 'beach town' },  
{ id: 'murudeshwar', name: 'Murudeshwar', country: 'India', type: 'temple' },  
{ id: 'dwarka', name: 'Dwarka', country: 'India', type: 'religious' },  
{ id: 'somnath', name: 'Somnath', country: 'India', type: 'temple' },  
{ id: 'velankanni', name: 'Velankanni', country: 'India', type: 'church' },  
{ id: 'ponda', name: 'Ponda', country: 'India', type: 'spice plantations' },  
{ id: 'chettinad', name: 'Chettinad', country: 'India', type: 'heritage' },  
{ id: 'thanjavur', name: 'Thanjavur', country: 'India', type: 'temple town' },  
{ id: 'mahabalipuram', name: 'Mahabalipuram', country: 'India', type: 'shore temple' },  
{ id: 'kumbakonam', name: 'Kumbakonam', country: 'India', type: 'temple town' },  
{ id: 'chidambaram', name: 'Chidambaram', country: 'India', type: 'temple' },  
{ id: 'tirupati', name: 'Tirupati', country: 'India', type: 'pilgrimage' },  
{ id: 'shirdi', name: 'Shirdi', country: 'India', type: 'religious' },  
{ id: 'nashik', name: 'Nashik', country: 'India', type: 'wine city' },  
{ id: 'aurangabad', name: 'Aurangabad', country: 'India', type: 'historical' },  
{ id: 'kolhapur', name: 'Kolhapur', country: 'India', type: 'temple town' },  
{ id: 'ratnagiri', name: 'Ratnagiri', country: 'India', type: 'coastal' },  
{ id: 'alibaug', name: 'Alibaug', country: 'India', type: 'beach town' },  
{ id: 'lavasa', name: 'Lavasa', country: 'India', type: 'planned city' },  
{ id: 'matheran', name: 'Matheran', country: 'India', type: 'hill station' },  
{ id: 'bhandardara', name: 'Bhandardara', country: 'India', type: 'scenic' },  
{ id: 'lonar', name: 'Lonar', country: 'India', type: 'crater lake' },  
{ id: 'chikmagalur', name: 'Chikmagalur', country: 'India', type: 'coffee' },  
{ id: 'belur-halebid', name: 'Belur & Halebid', country: 'India', type: 'temple' },  
{ id: 'sravanabelagola', name: 'Sravanabelagola', country: 'India', type: 'jain temple' },  
{ id: 'coonoor', name: 'Coonoor', country: 'India', type: 'tea gardens' },  
{ id: 'yercaud', name: 'Yercaud', country: 'India', type: 'hill station' },  
{ id: 'kutch', name: 'Kutch', country: 'India', type: 'white desert' },  
{ id: 'dholavira', name: 'Dholavira', country: 'India', type: 'harappan site' },  
{ id: 'bhuj', name: 'Bhuj', country: 'India', type: 'historical' },  
{ id: 'saputara', name: 'Saputara', country: 'India', type: 'hill station' },  
{ id: 'silvassa', name: 'Silvassa', country: 'India', type: 'tribal' },  
{ id: 'daman-diu', name: 'Daman & Diu', country: 'India', type: 'coastal' },  
{ id: 'port-blair', name: 'Port Blair', country: 'India', type: 'island capital' },  
{ id: 'kavaratti', name: 'Kavaratti', country: 'India', type: 'lakshadweep' },  
{ id: 'kohima', name: 'Kohima', country: 'India', type: 'tribal' },  
{ id: 'imphal', name: 'Imphal', country: 'India', type: 'valley' },  
{ id: 'aizawl', name: 'Aizawl', country: 'India', type: 'hills' },  
{ id: 'itanagar', name: 'Itanagar', country: 'India', type: 'tribal' },  
{ id: 'shillong', name: 'Shillong', country: 'India', type: 'scenic' },  
{ id: 'agartala', name: 'Agartala', country: 'India', type: 'cultural' },  
{ id: 'dimapur', name: 'Dimapur', country: 'India', type: 'commercial' },  
{ id: 'gangtok', name: 'Gangtok', country: 'India', type: 'mountain' },  
{ id: 'dispur', name: 'Dispur', country: 'India', type: 'capital' },  
{ id: 'itanagar', name: 'Itanagar', country: 'India', type: 'tribal' },  
{ id: 'kohima', name: 'Kohima', country: 'India', type: 'tribal' },  
{ id: 'imphal', name: 'Imphal', country: 'India', type: 'valley' },  
{ id: 'aizawl', name: 'Aizawl', country: 'India', type: 'hills' },  
{ id: 'agartala', name: 'Agartala', country: 'India', type: 'cultural' },  
{ id: 'shillong', name: 'Shillong', country: 'India', type: 'scenic' },  
{ id: 'gangtok', name: 'Gangtok', country: 'India', type: 'mountain' },  
{ id: 'kavaratti', name: 'Kavaratti', country: 'India', type: 'lakshadweep' },  
{ id: 'port-blair', name: 'Port Blair', country: 'India', type: 'island capital' }, 
{ id: 'dhanushkodi', name: 'Dhanushkodi', country: 'India', type: 'ghost town' },  
{ id: 'cherapunji', name: 'Cherapunji', country: 'India', type: 'rainforest' },  
{ id: 'spiti-valley', name: 'Spiti Valley', country: 'India', type: 'cold desert' },  
{ id: 'zanskar', name: 'Zanskar', country: 'India', type: 'frozen river' },  
{ id: 'majuli', name: 'Majuli', country: 'India', type: 'river island' },  
{ id: 'doodhpathri', name: 'Doodhpathri', country: 'India', type: 'hidden valley' },  
{ id: 'haflong', name: 'Haflong', country: 'India', type: 'only hill station in Assam' },  
{ id: 'tirthan-valley', name: 'Tirthan Valley', country: 'India', type: 'untouched hills' },   
{ id: 'raipur', name: 'Raipur', country: 'India', type: 'emerging city' },  
{ id: 'itanagar', name: 'Itanagar', country: 'India', type: 'tribal capital' },  
{ id: 'panaji', name: 'Panaji', country: 'India', type: 'port town' },  
{ id: 'amaravati', name: 'Amaravati', country: 'India', type: 'new capital' },  
{ id: 'ranchi', name: 'Ranchi', country: 'India', type: 'waterfall hub' },  
{ id: 'shillong', name: 'Shillong', country: 'India', type: 'Scotland of East' },  
{ id: 'mawlynnong', name: 'Mawlynnong', country: 'India', type: 'cleanest village' },  
{ id: 'shekhawati', name: 'Shekhawati', country: 'India', type: 'painted havelis' },  
{ id: 'champaner', name: 'Champaner', country: 'India', type: 'UNESCO ruins' },  
{ id: 'chettinad', name: 'Chettinad', country: 'India', type: 'heritage mansions' },  
{ id: 'srirangapatna', name: 'Srirangapatna', country: 'India', type: 'island fort' },  

// Rare Natural Wonders  
{ id: 'living-root-bridges', name: 'Living Root Bridges', country: 'India', type: 'bio-engineering' },  
{ id: 'laitmawsiang', name: 'Laitmawsiang', country: 'India', type: 'sacred forest' },  
{ id: 'lava', name: 'Lava', country: 'India', type: 'Himalayan village' },  
{ id: 'sandakphu', name: 'Sandakphu', country: 'India', type: 'Everest view' },  
{ id: 'phugtal-monastery', name: 'Phugtal Monastery', country: 'India', type: 'cliff temple' }  ,
{ id: 'amritsar', name: 'Amritsar', country: 'India', type: 'spiritual capital' },  
{ id: 'chandigarh', name: 'Chandigarh', country: 'India', type: 'planned city' },  
{ id: 'jallianwala-bagh', name: 'Jallianwala Bagh', country: 'India', type: 'historical memorial' },  
{ id: 'wagah-border', name: 'Wagah Border', country: 'India', type: 'patriotic ceremony' },  
{ id: 'patiala', name: 'Patiala', country: 'India', type: 'royal heritage' },  
{ id: 'anandpur-sahib', name: 'Anandpur Sahib', country: 'India', type: 'sikh pilgrimage' },  
{ id: 'bhatinda-fort', name: 'Bhatinda Fort', country: 'India', type: 'ancient fortress' },  
{ id: 'sultanpur-lodge', name: 'Sultanpur Lodge', country: 'India', type: 'bird sanctuary' },  
{ id: 'kurukshetra', name: 'Kurukshetra', country: 'India', type: 'mythological site' },  
{ id: 'pinjore-gardens', name: 'Pinjore Gardens', country: 'India', type: 'mughal gardens' },  
{ id: 'surajkund', name: 'Surajkund', country: 'India', type: 'crafts fair' },  
{ id: 'damdama-lake', name: 'Damdama Lake', country: 'India', type: 'picnic spot' },  
{ id: 'dharamshala', name: 'Dharamshala', country: 'India', type: 'tibetan hub' },  
{ id: 'mcleodganj', name: 'McLeodGanj', country: 'India', type: 'dalai lama home' },  
{ id: 'bir-billing', name: 'Bir Billing', country: 'India', type: 'paragliding capital' },  
{ id: 'triund', name: 'Triund', country: 'India', type: 'trekking paradise' },  
{ id: 'gulmarg', name: 'Gulmarg', country: 'India', type: 'ski destination' },  
{ id: 'pahalgam', name: 'Pahalgam', country: 'India', type: 'valley of shepherds' },  
{ id: 'sonamarg', name: 'Sonamarg', country: 'India', type: 'golden meadow' },  
{ id: 'vaishno-devi', name: 'Vaishno Devi', country: 'India', type: 'holy shrine' }  ,

{ id: 'amritsar', name: 'Amritsar', country: 'India', type: 'spiritual capital' },
{ id: 'ludhiana', name: 'Ludhiana', country: 'India', type: 'industrial hub' },
{ id: 'jalandhar', name: 'Jalandhar', country: 'India', type: 'sports equipment capital' },
{ id: 'patiala', name: 'Patiala', country: 'India', type: 'royal heritage' },
{ id: 'bathinda', name: 'Bathinda', country: 'India', type: 'historic fort city' },
{  id: 'punjab', name: 'Punjab', country: 'India', type: 'land of five rivers'},
{ id: 'konark', name: 'Konark', country: 'India', type: 'sun temple' },
{ id: 'puri', name: 'Puri', country: 'India', type: 'jagannath temple' },
{ id: 'bhubaneswar', name: 'Bhubaneswar', country: 'India', type: 'temple city' },
{ id: 'sambalpur', name: 'Sambalpur', country: 'India', type: 'textile city' },
{ id: 'rourkela', name: 'Rourkela', country: 'India', type: 'steel city' },
{ id: 'somnath', name: 'Somnath', country: 'India', type: 'jyotirlinga' },
{ id: 'gir-forest', name: 'Gir Forest', country: 'India', type: 'asiatic lions' },
{ id: 'palanpur', name: 'Palanpur', country: 'India', type: 'diamond city' },
{ id: 'surat', name: 'Surat', country: 'India', type: 'diamond capital' },
{ id: 'nagpur', name: 'Nagpur', country: 'India', type: 'orange city' },
{ id: 'wardha', name: 'Wardha', country: 'India', type: 'gandhian center' },
{ id: 'nanded', name: 'Nanded', country: 'India', type: 'sikh pilgrimage' },
{ id: 'kanyakumari', name: 'Kanyakumari', country: 'India', type: 'triveni sangam' },
{ id: 'rameshwaram', name: 'Rameshwaram', country: 'India', type: 'jyotirlinga' },
{ id: 'kodaikanal', name: 'Kodaikanal', country: 'India', type: 'princess of hills' },
{ id: 'hampi', name: 'Hampi', country: 'India', type: 'ruins of vijayanagara' },
{ id: 'badami', name: 'Badami', country: 'India', type: 'cave temples' },
{ id: 'bijapur', name: 'Bijapur', country: 'India', type: 'gol gumbaz' },
{ id: 'tawang', name: 'Tawang', country: 'India', type: 'buddhist monastery' },
{ id: 'cherrapunji', name: 'Cherrapunji', country: 'India', type: 'rains' },
{ id: 'kaziranga', name: 'Kaziranga', country: 'India', type: 'rhinoceros' },
{ id: 'daman', name: 'Daman', country: 'India', type: 'portuguese colony' },
{ id: 'diu', name: 'Diu', country: 'India', type: 'island fort' },
{ id: 'silvassa', name: 'Silvassa', country: 'India', type: 'tribal capital' },
{ id: 'ayodhya', name: 'Ayodhya', country: 'India', type: 'ram janmabhoomi' },
{ id: 'mathura', name: 'Mathura', country: 'India', type: 'krishna janmabhoomi' },
{ id: 'vrindavan', name: 'Vrindavan', country: 'India', type: 'krishna temples' },
{ id: 'bandipur', name: 'Bandipur', country: 'India', type: 'tiger reserve' },
{ id: 'periyar', name: 'Periyar', country: 'India', type: 'elephant reserve' },
{ id: 'sunderbans', name: 'Sunderbans', country: 'India', type: 'bengal tigers' },
{ id: 'coorg', name: 'Coorg', country: 'India', type: 'coffee country' },
{ id: 'yercaud', name: 'Yercaud', country: 'India', type: 'lake hill station' },
{ id: 'munnar', name: 'Munnar', country: 'India', type: 'tea gardens' },
{ id: 'kovalam', name: 'Kovalam', country: 'India', type: 'lighthouse beach' },
{ id: 'marari', name: 'Marari', country: 'India', type: 'quiet beach' },
{ id: 'gokarna', name: 'Gokarna', country: 'India', type: 'hippie beach' },
{ id: 'rishikesh', name: 'Rishikesh', country: 'India', type: 'white water rafting' },
{ id: 'bir', name: 'Bir', country: 'India', type: 'paragliding' },
{ id: 'solang', name: 'Solang Valley', country: 'India', type: 'skiing' },
{ id: 'kolkata', name: 'Kolkata', country: 'India', type: 'cultural capital' },
{ id: 'mumbai', name: 'Mumbai', country: 'India', type: 'bollywood' },
{ id: 'chennai', name: 'Chennai', country: 'India', type: 'kollywood' },
{ id: 'ziro', name: 'Ziro', country: 'India', type: 'music festival' },
{ id: 'spiti', name: 'Spiti Valley', country: 'India', type: 'cold desert' },
{ id: 'dhanushkodi', name: 'Dhanushkodi', country: 'India', type: 'ghost town' },
{ id: 'andhra-pradesh', name: 'Andhra Pradesh', country: 'India', type: 'state' },
{ id: 'arunachal-pradesh', name: 'Arunachal Pradesh', country: 'India', type: 'state' },
{ id: 'assam', name: 'Assam', country: 'India', type: 'state' },
{ id: 'bihar', name: 'Bihar', country: 'India', type: 'state' },
{ id: 'chhattisgarh', name: 'Chhattisgarh', country: 'India', type: 'state' },
{ id: 'goa', name: 'Goa', country: 'India', type: 'state' },
{ id: 'gujarat', name: 'Gujarat', country: 'India', type: 'state' },
{ id: 'haryana', name: 'Haryana', country: 'India', type: 'state' },
{ id: 'himachal-pradesh', name: 'Himachal Pradesh', country: 'India', type: 'state' },
{ id: 'jharkhand', name: 'Jharkhand', country: 'India', type: 'state' },
{ id: 'karnataka', name: 'Karnataka', country: 'India', type: 'state' },
{ id: 'kerala', name: 'Kerala', country: 'India', type: 'state' },
{ id: 'madhya-pradesh', name: 'Madhya Pradesh', country: 'India', type: 'state' },
{ id: 'maharashtra', name: 'Maharashtra', country: 'India', type: 'state' },
{ id: 'manipur', name: 'Manipur', country: 'India', type: 'state' },
{ id: 'meghalaya', name: 'Meghalaya', country: 'India', type: 'state' },
{ id: 'mizoram', name: 'Mizoram', country: 'India', type: 'state' },
{ id: 'nagaland', name: 'Nagaland', country: 'India', type: 'state' },
{ id: 'odisha', name: 'Odisha', country: 'India', type: 'state' },
{ id: 'punjab', name: 'Punjab', country: 'India', type: 'state' },
{ id: 'rajasthan', name: 'Rajasthan', country: 'India', type: 'state' },
{ id: 'sikkim', name: 'Sikkim', country: 'India', type: 'state' },
{ id: 'tamil-nadu', name: 'Tamil Nadu', country: 'India', type: 'state' },
{ id: 'telangana', name: 'Telangana', country: 'India', type: 'state' },
{ id: 'tripura', name: 'Tripura', country: 'India', type: 'state' },
{ id: 'uttar-pradesh', name: 'Uttar Pradesh', country: 'India', type: 'state' },
{ id: 'uttarakhand', name: 'Uttarakhand', country: 'India', type: 'state' },
{ id: 'west-bengal', name: 'West Bengal', country: 'India', type: 'state' },

  ],
  
  // International destinations
  international: [
    { id: 'london', name: 'London', country: 'UK', type: 'capital' },
    { id: 'paris', name: 'Paris', country: 'France', type: 'romantic' },
    { id: 'new-york', name: 'New York', country: 'USA', type: 'metropolitan' },
    { id: 'dubai', name: 'Dubai', country: 'UAE', type: 'luxury' },
    { id: 'singapore', name: 'Singapore', country: 'Singapore', type: 'modern' },
    { id: 'tokyo', name: 'Tokyo', country: 'Japan', type: 'cosmopolitan' },
    { id: 'sydney', name: 'Sydney', country: 'Australia', type: 'harbor' },
    { id: 'bangkok', name: 'Bangkok', country: 'Thailand', type: 'vibrant' },
    { id: 'rome', name: 'Rome', country: 'Italy', type: 'historical' },
    { id: 'istanbul', name: 'Istanbul', country: 'Turkey', type: 'transcontinental' },
    { id: 'barcelona', name: 'Barcelona', country: 'Spain', type: 'artistic' },
    { id: 'venice', name: 'Venice', country: 'Italy', type: 'canal city' },
    { id: 'amsterdam', name: 'Amsterdam', country: 'Netherlands', type: 'canal city' },
    { id: 'berlin', name: 'Berlin', country: 'Germany', type: 'historical' },
    { id: 'vienna', name: 'Vienna', country: 'Austria', type: 'imperial' },
    { id: 'prague', name: 'Prague', country: 'Czech Republic', type: 'medieval' },
    { id: 'athens', name: 'Athens', country: 'Greece', type: 'ancient' },
    { id: 'cairo', name: 'Cairo', country: 'Egypt', type: 'pyramids' },
    { id: 'capetown', name: 'Cape Town', country: 'South Africa', type: 'scenic' },
    { id: 'rio-de-janeiro', name: 'Rio de Janeiro', country: 'Brazil', type: 'carnival' },
    { id: 'machu-picchu', name: 'Machu Picchu', country: 'Peru', type: 'ancient ruins' },
    { id: 'beijing', name: 'Beijing', country: 'China', type: 'great wall' },
    { id: 'shanghai', name: 'Shanghai', country: 'China', type: 'modern' },
    { id: 'hong-kong', name: 'Hong Kong', country: 'China', type: 'skyline' },
    { id: 'seoul', name: 'Seoul', country: 'South Korea', type: 'k-pop' },
    { id: 'bali', name: 'Bali', country: 'Indonesia', type: 'island paradise' },
    { id: 'kuala-lumpur', name: 'Kuala Lumpur', country: 'Malaysia', type: 'petronas towers' },
    { id: 'moscow', name: 'Moscow', country: 'Russia', type: 'red square' },
    { id: 'santorini', name: 'Santorini', country: 'Greece', type: 'white buildings' },
    { id: 'zurich', name: 'Zurich', country: 'Switzerland', type: 'alpine' },
    { id: 'geneva', name: 'Geneva', country: 'Switzerland', type: 'lake geneva' },
    { id: 'oslo', name: 'Oslo', country: 'Norway', type: 'fjords' },
    { id: 'stockholm', name: 'Stockholm', country: 'Sweden', type: 'archipelago' },
    { id: 'helsinki', name: 'Helsinki', country: 'Finland', type: 'design capital' },
    { id: 'reykjavik', name: 'Reykjavik', country: 'Iceland', type: 'northern lights' },
    { id: 'toronto', name: 'Toronto', country: 'Canada', type: 'cn tower' },
    { id: 'vancouver', name: 'Vancouver', country: 'Canada', type: 'pacific coast' },
    { id: 'melbourne', name: 'Melbourne', country: 'Australia', type: 'cultural' },
    { id: 'auckland', name: 'Auckland', country: 'New Zealand', type: 'hobbiton' },
    { id: 'queenstown', name: 'Queenstown', country: 'New Zealand', type: 'adventure' },
    { id: 'fiji', name: 'Fiji', country: 'Fiji', type: 'tropical' },
    { id: 'maldives', name: 'Maldives', country: 'Maldives', type: 'overwater bungalows' },
    { id: 'mauritius', name: 'Mauritius', country: 'Mauritius', type: 'beaches' },
    { id: 'seychelles', name: 'Seychelles', country: 'Seychelles', type: 'granite islands' },
    { id: 'uk', name: 'United Kingdom', type: 'country' },
{ id: 'france', name: 'France', type: 'country' },
{ id: 'usa', name: 'United States', type: 'country' },
{ id: 'uae', name: 'United Arab Emirates', type: 'country' },
{ id: 'singapore', name: 'Singapore', type: 'country' },
{ id: 'japan', name: 'Japan', type: 'country' },
{ id: 'australia', name: 'Australia', type: 'country' },
{ id: 'thailand', name: 'Thailand', type: 'country' },
{ id: 'italy', name: 'Italy', type: 'country' },
{ id: 'turkey', name: 'Turkey', type: 'country' },
{ id: 'spain', name: 'Spain', type: 'country' },
{ id: 'netherlands', name: 'Netherlands', type: 'country' },
{ id: 'germany', name: 'Germany', type: 'country' },
{ id: 'austria', name: 'Austria', type: 'country' },
{ id: 'czech-republic', name: 'Czech Republic', type: 'country' },
{ id: 'greece', name: 'Greece', type: 'country' },
{ id: 'egypt', name: 'Egypt', type: 'country' },
{ id: 'south-africa', name: 'South Africa', type: 'country' },
{ id: 'brazil', name: 'Brazil', type: 'country' },
{ id: 'peru', name: 'Peru', type: 'country' },
{ id: 'china', name: 'China', type: 'country' },
{ id: 'south-korea', name: 'South Korea', type: 'country' },
{ id: 'indonesia', name: 'Indonesia', type: 'country' },
{ id: 'malaysia', name: 'Malaysia', type: 'country' },
{ id: 'russia', name: 'Russia', type: 'country' },
{ id: 'switzerland', name: 'Switzerland', type: 'country' },
{ id: 'norway', name: 'Norway', type: 'country' },
{ id: 'sweden', name: 'Sweden', type: 'country' },
{ id: 'finland', name: 'Finland', type: 'country' },
{ id: 'iceland', name: 'Iceland', type: 'country' },
{ id: 'canada', name: 'Canada', type: 'country' },
{ id: 'new-zealand', name: 'New Zealand', type: 'country' },
{ id: 'fiji', name: 'Fiji', type: 'country' },
{ id: 'maldives', name: 'Maldives', type: 'country' },
{ id: 'mauritius', name: 'Mauritius', type: 'country' },
{ id: 'seychelles', name: 'Seychelles', type: 'country' },
{ id: 'united-kingdom', name: 'United Kingdom', type: 'country' },
{ id: 'france', name: 'France', type: 'country' },
{ id: 'united-states', name: 'United States', type: 'country' },
{ id: 'united-arab-emirates', name: 'United Arab Emirates', type: 'country' },
{ id: 'singapore', name: 'Singapore', type: 'country' },
{ id: 'japan', name: 'Japan', type: 'country' },
{ id: 'australia', name: 'Australia', type: 'country' },
{ id: 'thailand', name: 'Thailand', type: 'country' },
{ id: 'italy', name: 'Italy', type: 'country' },
{ id: 'turkey', name: 'Turkey', type: 'country' },
{ id: 'spain', name: 'Spain', type: 'country' },
{ id: 'netherlands', name: 'Netherlands', type: 'country' },
{ id: 'germany', name: 'Germany', type: 'country' },
{ id: 'austria', name: 'Austria', type: 'country' },
{ id: 'czech-republic', name: 'Czech Republic', type: 'country' },
{ id: 'greece', name: 'Greece', type: 'country' },
{ id: 'egypt', name: 'Egypt', type: 'country' },
{ id: 'south-africa', name: 'South Africa', type: 'country' },
{ id: 'brazil', name: 'Brazil', type: 'country' },
{ id: 'peru', name: 'Peru', type: 'country' },
{ id: 'china', name: 'China', type: 'country' },
{ id: 'south-korea', name: 'South Korea', type: 'country' },
{ id: 'indonesia', name: 'Indonesia', type: 'country' },
{ id: 'malaysia', name: 'Malaysia', type: 'country' },
{ id: 'russia', name: 'Russia', type: 'country' },
{ id: 'switzerland', name: 'Switzerland', type: 'country' },
{ id: 'norway', name: 'Norway', type: 'country' },
{ id: 'sweden', name: 'Sweden', type: 'country' },
{ id: 'finland', name: 'Finland', type: 'country' },
{ id: 'iceland', name: 'Iceland', type: 'country' },
{ id: 'canada', name: 'Canada', type: 'country' },
{ id: 'new-zealand', name: 'New Zealand', type: 'country' },
{ id: 'fiji', name: 'Fiji', type: 'country' },
{ id: 'maldives', name: 'Maldives', type: 'country' },
{ id: 'mauritius', name: 'Mauritius', type: 'country' },
{ id: 'seychelles', name: 'Seychelles', type: 'country' },
{ id: 'uk', name: 'United Kingdom', country: 'UK', type: 'country', continent: 'Europe' },
{ id: 'france', name: 'France', country: 'France', type: 'country', continent: 'Europe' },
{ id: 'italy', name: 'Italy', country: 'Italy', type: 'country', continent: 'Europe' },
{ id: 'germany', name: 'Germany', country: 'Germany', type: 'country', continent: 'Europe' },
{ id: 'spain', name: 'Spain', country: 'Spain', type: 'country', continent: 'Europe' },
{ id: 'india', name: 'India', country: 'India', type: 'country', continent: 'Asia' },
{ id: 'japan', name: 'Japan', country: 'Japan', type: 'country', continent: 'Asia' },
{ id: 'thailand', name: 'Thailand', country: 'Thailand', type: 'country', continent: 'Asia' },
{ id: 'china', name: 'China', country: 'China', type: 'country', continent: 'Asia' },
{ id: 'uae', name: 'United Arab Emirates', country: 'UAE', type: 'country', continent: 'Asia' },
{ id: 'usa', name: 'United States', country: 'USA', type: 'country', continent: 'North America' },
{ id: 'canada', name: 'Canada', country: 'Canada', type: 'country', continent: 'North America' },
{ id: 'brazil', name: 'Brazil', country: 'Brazil', type: 'country', continent: 'South America' },
{ id: 'australia', name: 'Australia', country: 'Australia', type: 'country', continent: 'Oceania' },
{ id: 'south-africa', name: 'South Africa', country: 'South Africa', type: 'country', continent: 'Africa' },
{ id: 'egypt', name: 'Egypt', country: 'Egypt', type: 'country', continent: 'Africa' },
{ id: 'vietnam', name: 'Vietnam', type: 'country' },
{ id: 'philippines', name: 'Philippines', type: 'country' },
{ id: 'taiwan', name: 'Taiwan', type: 'country' },
{ id: 'bangladesh', name: 'Bangladesh', type: 'country' },
{ id: 'sri-lanka', name: 'Sri Lanka', type: 'country' },
{ id: 'portugal', name: 'Portugal', type: 'country' },
{ id: 'belgium', name: 'Belgium', type: 'country' },
{ id: 'hungary', name: 'Hungary', type: 'country' },
{ id: 'poland', name: 'Poland', type: 'country' },
{ id: 'ukraine', name: 'Ukraine', type: 'country' },
{ id: 'kenya', name: 'Kenya', type: 'country' },
{ id: 'morocco', name: 'Morocco', type: 'country' },
{ id: 'tanzania', name: 'Tanzania', type: 'country' },
{ id: 'namibia', name: 'Namibia', type: 'country' },
{ id: 'ghana', name: 'Ghana', type: 'country' },
{ id: 'saudi-arabia', name: 'Saudi Arabia', type: 'country' },
{ id: 'qatar', name: 'Qatar', type: 'country' },
{ id: 'iran', name: 'Iran', type: 'country' },
{ id: 'israel', name: 'Israel', type: 'country' },
{ id: 'jordan', name: 'Jordan', type: 'country' },
{ id: 'argentina', name: 'Argentina', type: 'country' },
{ id: 'chile', name: 'Chile', type: 'country' },
{ id: 'cuba', name: 'Cuba', type: 'country' },
{ id: 'costa-rica', name: 'Costa Rica', type: 'country' },
{ id: 'argentina', name: 'Argentina', type: 'country', continent: 'South America' },
{ id: 'mexico', name: 'Mexico', type: 'country', continent: 'North America' },
{ id: 'colombia', name: 'Colombia', type: 'country', continent: 'South America' },
{ id: 'chile', name: 'Chile', type: 'country', continent: 'South America' },
{ id: 'portugal', name: 'Portugal', type: 'country', continent: 'Europe' },
{ id: 'belgium', name: 'Belgium', type: 'country', continent: 'Europe' },
{ id: 'ireland', name: 'Ireland', type: 'country', continent: 'Europe' },
{ id: 'denmark', name: 'Denmark', type: 'country', continent: 'Europe' },
{ id: 'poland', name: 'Poland', type: 'country', continent: 'Europe' },
{ id: 'hungary', name: 'Hungary', type: 'country', continent: 'Europe' },
{ id: 'romania', name: 'Romania', type: 'country', continent: 'Europe' },
{ id: 'ukraine', name: 'Ukraine', type: 'country', continent: 'Europe' },
{ id: 'bulgaria', name: 'Bulgaria', type: 'country', continent: 'Europe' },
{ id: 'croatia', name: 'Croatia', type: 'country', continent: 'Europe' },
{ id: 'serbia', name: 'Serbia', type: 'country', continent: 'Europe' },
{ id: 'slovakia', name: 'Slovakia', type: 'country', continent: 'Europe' },
{ id: 'slovenia', name: 'Slovenia', type: 'country', continent: 'Europe' },
{ id: 'estonia', name: 'Estonia', type: 'country', continent: 'Europe' },
{ id: 'latvia', name: 'Latvia', type: 'country', continent: 'Europe' },
{ id: 'lithuania', name: 'Lithuania', type: 'country', continent: 'Europe' },
{ id: 'luxembourg', name: 'Luxembourg', type: 'country', continent: 'Europe' },
{ id: 'malta', name: 'Malta', type: 'country', continent: 'Europe' },
{ id: 'monaco', name: 'Monaco', type: 'country', continent: 'Europe' },
{ id: 'andorra', name: 'Andorra', type: 'country', continent: 'Europe' },
{ id: 'liechtenstein', name: 'Liechtenstein', type: 'country', continent: 'Europe' },
{ id: 'san-marino', name: 'San Marino', type: 'country', continent: 'Europe' },
{ id: 'vatican-city', name: 'Vatican City', type: 'country', continent: 'Europe' },
{ id: 'belarus', name: 'Belarus', type: 'country', continent: 'Europe' },
{ id: 'moldova', name: 'Moldova', type: 'country', continent: 'Europe' },
{ id: 'albania', name: 'Albania', type: 'country', continent: 'Europe' },
{ id: 'north-macedonia', name: 'North Macedonia', type: 'country', continent: 'Europe' },
{ id: 'bosnia-herzegovina', name: 'Bosnia and Herzegovina', type: 'country', continent: 'Europe' },
{ id: 'montenegro', name: 'Montenegro', type: 'country', continent: 'Europe' },
{ id: 'kosovo', name: 'Kosovo', type: 'country', continent: 'Europe' },
{ id: 'iceland', name: 'Iceland', type: 'country', continent: 'Europe' },
{ id: 'greenland', name: 'Greenland', type: 'country', continent: 'North America' },
{ id: 'philippines', name: 'Philippines', type: 'country', continent: 'Asia' },
{ id: 'vietnam', name: 'Vietnam', type: 'country', continent: 'Asia' },
{ id: 'malaysia', name: 'Malaysia', type: 'country', continent: 'Asia' },
{ id: 'indonesia', name: 'Indonesia', type: 'country', continent: 'Asia' },
{ id: 'sri-lanka', name: 'Sri Lanka', type: 'country', continent: 'Asia' },
{ id: 'pakistan', name: 'Pakistan', type: 'country', continent: 'Asia' },
{ id: 'bangladesh', name: 'Bangladesh', type: 'country', continent: 'Asia' },
{ id: 'nepal', name: 'Nepal', type: 'country', continent: 'Asia' },
{ id: 'bhutan', name: 'Bhutan', type: 'country', continent: 'Asia' },
{ id: 'myanmar', name: 'Myanmar', type: 'country', continent: 'Asia' },
{ id: 'laos', name: 'Laos', type: 'country', continent: 'Asia' },
{ id: 'cambodia', name: 'Cambodia', type: 'country', continent: 'Asia' },
{ id: 'mongolia', name: 'Mongolia', type: 'country', continent: 'Asia' },
{ id: 'taiwan', name: 'Taiwan', type: 'country', continent: 'Asia' },
{ id: 'north-korea', name: 'North Korea', type: 'country', continent: 'Asia' },
{ id: 'iraq', name: 'Iraq', type: 'country', continent: 'Asia' },
{ id: 'iran', name: 'Iran', type: 'country', continent: 'Asia' },
{ id: 'saudi-arabia', name: 'Saudi Arabia', type: 'country', continent: 'Asia' },
{ id: 'qatar', name: 'Qatar', type: 'country', continent: 'Asia' },
{ id: 'kuwait', name: 'Kuwait', type: 'country', continent: 'Asia' },
{ id: 'oman', name: 'Oman', type: 'country', continent: 'Asia' },
{ id: 'yemen', name: 'Yemen', type: 'country', continent: 'Asia' },
{ id: 'jordan', name: 'Jordan', type: 'country', continent: 'Asia' },
{ id: 'lebanon', name: 'Lebanon', type: 'country', continent: 'Asia' },
{ id: 'israel', name: 'Israel', type: 'country', continent: 'Asia' },
{ id: 'palestine', name: 'Palestine', type: 'country', continent: 'Asia' },
{ id: 'syria', name: 'Syria', type: 'country', continent: 'Asia' },
{ id: 'afghanistan', name: 'Afghanistan', type: 'country', continent: 'Asia' },
{ id: 'kazakhstan', name: 'Kazakhstan', type: 'country', continent: 'Asia' },
{ id: 'uzbekistan', name: 'Uzbekistan', type: 'country', continent: 'Asia' },
{ id: 'turkmenistan', name: 'Turkmenistan', type: 'country', continent: 'Asia' },
{ id: 'tajikistan', name: 'Tajikistan', type: 'country', continent: 'Asia' },
{ id: 'kyrgyzstan', name: 'Kyrgyzstan', type: 'country', continent: 'Asia' },
{ id: 'armenia', name: 'Armenia', type: 'country', continent: 'Asia' },
{ id: 'azerbaijan', name: 'Azerbaijan', type: 'country', continent: 'Asia' },
{ id: 'georgia', name: 'Georgia', type: 'country', continent: 'Asia' },
{ id: 'cyprus', name: 'Cyprus', type: 'country', continent: 'Asia' },
{ id: 'morocco', name: 'Morocco', type: 'country', continent: 'Africa' },
{ id: 'algeria', name: 'Algeria', type: 'country', continent: 'Africa' },
{ id: 'tunisia', name: 'Tunisia', type: 'country', continent: 'Africa' },
{ id: 'libya', name: 'Libya', type: 'country', continent: 'Africa' },
{ id: 'sudan', name: 'Sudan', type: 'country', continent: 'Africa' },
{ id: 'ethiopia', name: 'Ethiopia', type: 'country', continent: 'Africa' },
{ id: 'kenya', name: 'Kenya', type: 'country', continent: 'Africa' },
{ id: 'tanzania', name: 'Tanzania', type: 'country', continent: 'Africa' },
{ id: 'uganda', name: 'Uganda', type: 'country', continent: 'Africa' },
{ id: 'rwanda', name: 'Rwanda', type: 'country', continent: 'Africa' },
{ id: 'burundi', name: 'Burundi', type: 'country', continent: 'Africa' },
{ id: 'angola', name: 'Angola', type: 'country', continent: 'Africa' },
{ id: 'mozambique', name: 'Mozambique', type: 'country', continent: 'Africa' },
{ id: 'zambia', name: 'Zambia', type: 'country', continent: 'Africa' },
{ id: 'zimbabwe', name: 'Zimbabwe', type: 'country', continent: 'Africa' },
{ id: 'botswana', name: 'Botswana', type: 'country', continent: 'Africa' },
{ id: 'namibia', name: 'Namibia', type: 'country', continent: 'Africa' },
{ id: 'senegal', name: 'Senegal', type: 'country', continent: 'Africa' },
{ id: 'ghana', name: 'Ghana', type: 'country', continent: 'Africa' },
{ id: 'nigeria', name: 'Nigeria', type: 'country', continent: 'Africa' },
{ id: 'cameroon', name: 'Cameroon', type: 'country', continent: 'Africa' },
{ id: 'mali', name: 'Mali', type: 'country', continent: 'Africa' },
{ id: 'niger', name: 'Niger', type: 'country', continent: 'Africa' },
{ id: 'chad', name: 'Chad', type: 'country', continent: 'Africa' },
{ id: 'mauritania', name: 'Mauritania', type: 'country', continent: 'Africa' },
{ id: 'madagascar', name: 'Madagascar', type: 'country', continent: 'Africa' },
{ id: 'congo', name: 'Republic of the Congo', type: 'country', continent: 'Africa' },
{ id: 'drc', name: 'Democratic Republic of the Congo', type: 'country', continent: 'Africa' },
{ id: 'gabon', name: 'Gabon', type: 'country', continent: 'Africa' },
{ id: 'equatorial-guinea', name: 'Equatorial Guinea', type: 'country', continent: 'Africa' },
{ id: 'sao-tome-and-principe', name: 'São Tomé and Príncipe', type: 'country', continent: 'Africa' },
{ id: 'central-african-republic', name: 'Central African Republic', type: 'country', continent: 'Africa' },
{ id: 'south-sudan', name: 'South Sudan', type: 'country', continent: 'Africa' },
{ id: 'eritrea', name: 'Eritrea', type: 'country', continent: 'Africa' },
{ id: 'djibouti', name: 'Djibouti', type: 'country', continent: 'Africa' },
{ id: 'somalia', name: 'Somalia', type: 'country', continent: 'Africa' },
{ id: 'comoros', name: 'Comoros', type: 'country', continent: 'Africa' },
{ id: 'seychelles', name: 'Seychelles', type: 'country', continent: 'Africa' },
{ id: 'mauritius', name: 'Mauritius', type: 'country', continent: 'Africa' },
{ id: 'cape-verde', name: 'Cape Verde', type: 'country', continent: 'Africa' },
{ id: 'gambia', name: 'Gambia', type: 'country', continent: 'Africa' },
{ id: 'guinea-bissau', name: 'Guinea-Bissau', type: 'country', continent: 'Africa' },
{ id: 'sierra-leone', name: 'Sierra Leone', type: 'country', continent: 'Africa' },
{ id: 'liberia', name: 'Liberia', type: 'country', continent: 'Africa' },
{ id: 'benin', name: 'Benin', type: 'country', continent: 'Africa' },
{ id: 'togo', name: 'Togo', type: 'country', continent: 'Africa' },
{ id: 'burkina-faso', name: 'Burkina Faso', type: 'country', continent: 'Africa' },
{ id: 'guinea', name: 'Guinea', type: 'country', continent: 'Africa' },
{ id: 'lesotho', name: 'Lesotho', type: 'country', continent: 'Africa' },
{ id: 'eswatini', name: 'Eswatini', type: 'country', continent: 'Africa' },
{ id: 'cuba', name: 'Cuba', type: 'country', continent: 'North America' },
{ id: 'jamaica', name: 'Jamaica', type: 'country', continent: 'North America' },
{ id: 'haiti', name: 'Haiti', type: 'country', continent: 'North America' },
{ id: 'dominican-republic', name: 'Dominican Republic', type: 'country', continent: 'North America' },
{ id: 'bahamas', name: 'Bahamas', type: 'country', continent: 'North America' },
{ id: 'costa-rica', name: 'Costa Rica', type: 'country', continent: 'North America' },
{ id: 'panama', name: 'Panama', type: 'country', continent: 'North America' },
{ id: 'nicaragua', name: 'Nicaragua', type: 'country', continent: 'North America' },
{ id: 'honduras', name: 'Honduras', type: 'country', continent: 'North America' },
{ id: 'el-salvador', name: 'El Salvador', type: 'country', continent: 'North America' },
{ id: 'guatemala', name: 'Guatemala', type: 'country', continent: 'North America' },
{ id: 'belize', name: 'Belize', type: 'country', continent: 'North America' },
{ id: 'trinidad-and-tobago', name: 'Trinidad and Tobago', type: 'country', continent: 'North America' },
{ id: 'barbados', name: 'Barbados', type: 'country', continent: 'North America' },
{ id: 'dominica', name: 'Dominica', type: 'country', continent: 'North America' },
{ id: 'grenada', name: 'Grenada', type: 'country', continent: 'North America' },
{ id: 'antigua-and-barbuda', name: 'Antigua and Barbuda', type: 'country', continent: 'North America' },
{ id: 'saint-lucia', name: 'Saint Lucia', type: 'country', continent: 'North America' },
{ id: 'saint-vincent-and-the-grenadines', name: 'Saint Vincent and the Grenadines', type: 'country', continent: 'North America' },
{ id: 'saint-kitts-and-nevis', name: 'Saint Kitts and Nevis', type: 'country', continent: 'North America' },
{ id: 'suriname', name: 'Suriname', type: 'country', continent: 'South America' },
{ id: 'guyana', name: 'Guyana', type: 'country', continent: 'South America' },
{ id: 'ecuador', name: 'Ecuador', type: 'country', continent: 'South America' },
{ id: 'venezuela', name: 'Venezuela', type: 'country', continent: 'South America' },
{ id: 'bolivia', name: 'Bolivia', type: 'country', continent: 'South America' },
{ id: 'paraguay', name: 'Paraguay', type: 'country', continent: 'South America' },
{ id: 'uruguay', name: 'Uruguay', type: 'country', continent: 'South America' },
{ id: 'fiji', name: 'Fiji', type: 'country', continent: 'Oceania' },
{ id: 'papua-new-guinea', name: 'Papua New Guinea', type: 'country', continent: 'Oceania' },
{ id: 'solomon-islands', name: 'Solomon Islands', type: 'country', continent: 'Oceania' },
{ id: 'vanuatu', name: 'Vanuatu', type: 'country', continent: 'Oceania' },
{ id: 'samoa', name: 'Samoa', type: 'country', continent: 'Oceania' },
{ id: 'tonga', name: 'Tonga', type: 'country', continent: 'Oceania' },
{ id: 'kiribati', name: 'Kiribati', type: 'country', continent: 'Oceania' },
{ id: 'marshall-islands', name: 'Marshall Islands', type: 'country', continent: 'Oceania' },
{ id: 'micronesia', name: 'Micronesia', type: 'country', continent: 'Oceania' },
{ id: 'palau', name: 'Palau', type: 'country', continent: 'Oceania' },
{ id: 'nauru', name: 'Nauru', type: 'country', continent: 'Oceania' },
{ id: 'tuvalu', name: 'Tuvalu', type: 'country', continent: 'Oceania' }
  ]
};

// Get all valid destination names for validation
const ALL_DESTINATIONS = [
  ...VALID_DESTINATIONS.domestic,
  ...VALID_DESTINATIONS.international
].map(dest => dest.id);

const Booking = ({ addBooking }) => {
  // Main form state
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    packageType: 'Family',
    duration: 7,
    travelers: 1,
    travelerInfo: {
      name: '',
      email: '',
      phone: '',
      address: '',
      idType: 'Aadhar Card',
      idNumber: ''
    },
    addons: {
      flight: false,
      hotel: false,
      car: false,
      train: false,
      bus: false,
      guide: false
    }
  });

  // Flight booking state
  const [flightData, setFlightData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    class: 'Economy',
    selectedFlight: null,
    availableFlights: []
  });

  // Hotel booking state
  const [hotelData, setHotelData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    budget: 'Medium',
    starRating: 3,
    selectedHotel: null,
    availableHotels: []
  });

  // Car rental state
  const [carData, setCarData] = useState({
    pickupDate: '',
    dropoffDate: '',
    carType: '4-seater',
    selectedCar: null,
    availableCars: []
  });

  // Train booking state
  const [trainData, setTrainData] = useState({
    from: '',
    to: '',
    travelDate: '',
    passengers: 1,
    class: 'Sleeper',
    selectedTrain: null,
    availableTrains: []
  });

  // Bus booking state
  const [busData, setBusData] = useState({
    from: '',
    to: '',
    travelDate: '',
    passengers: 1,
    busType: 'Seater',
    selectedBus: null,
    availableBuses: []
  });

  // App state
  const [weather, setWeather] = useState(null);
  const [payment, setPayment] = useState({
    amount: 0,
    status: 'pending',
    razorpayOrderId: null,
    receipt: null
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [showReceipt, setShowReceipt] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [transportError, setTransportError] = useState('');
  const [destinationError, setDestinationError] = useState('');
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [isInternational, setIsInternational] = useState(false);
  const [destinationDetails, setDestinationDetails] = useState(null);

  // Calculate total amount
  useEffect(() => {
    let total = 0;
    
    // Base package price
    switch(formData.packageType) {
      case 'Family': total += 500 * formData.travelers; break;
      case 'Honeymoon': total += 800 * 2; break;
      case 'Adventure': total += 600 * formData.travelers; break;
      case 'Budget': total += 300 * formData.travelers; break;
      default: total += 400 * formData.travelers;
    }
    
    // Flight cost
    if (formData.addons.flight && flightData.selectedFlight) {
      total += flightData.selectedFlight.price * flightData.passengers;
    }
    
    // Hotel cost
    if (formData.addons.hotel && hotelData.selectedHotel) {
      const nights = Math.ceil((new Date(hotelData.checkOut)) - new Date(hotelData.checkIn)) / (1000 * 60 * 60 * 24);
      total += hotelData.selectedHotel.price * nights;
    }
    
    // Car cost
    if (formData.addons.car && carData.selectedCar) {
      const days = Math.ceil((new Date(carData.dropoffDate) - new Date(carData.pickupDate)) / (1000 * 60 * 60 * 24));
      total += carData.selectedCar.price * days;
    }
    
    // Train cost
    if (formData.addons.train && trainData.selectedTrain) {
      total += trainData.selectedTrain.price * trainData.passengers;
    }

    // Bus cost
    if (formData.addons.bus && busData.selectedBus) {
      total += busData.selectedBus.price * busData.passengers;
    }
    
    setPayment(prev => ({ ...prev, amount: total }));
  }, [formData, flightData, hotelData, carData, trainData, busData]);

  // Validate destination and check if international
  useEffect(() => {
    if (formData.destination) {
      // Find the destination in our valid destinations
      const normalizedInput = formData.destination.toLowerCase().replace(/\s+/g, '-');
      const foundDestination = ALL_DESTINATIONS.find(dest => dest === normalizedInput);
      
      if (!foundDestination) {
        setDestinationError('Please enter a valid destination');
        setIsInternational(false);
        setDestinationDetails(null);
        
        // Show suggestions based on input
        const suggestions = [
          ...VALID_DESTINATIONS.domestic,
          ...VALID_DESTINATIONS.international
        ].filter(dest => 
          dest.name.toLowerCase().includes(formData.destination.toLowerCase()) ||
          dest.id.includes(normalizedInput)
        ).slice(0, 5);
        
        setDestinationSuggestions(suggestions);
      } else {
        setDestinationError('');
        setDestinationSuggestions([]);
        
        // Check if international
        const isIntl = VALID_DESTINATIONS.international.some(dest => dest.id === normalizedInput);
        setIsInternational(isIntl);
        
        // Set destination details
        const details = [
          ...VALID_DESTINATIONS.domestic,
          ...VALID_DESTINATIONS.international
        ].find(dest => dest.id === normalizedInput);
        
        setDestinationDetails(details);
        
        // Disable bus/train for international destinations
        if (isIntl) {
          setTransportError('For international destinations, only flights are available');
          setFormData(prev => ({
            ...prev,
            addons: {
              ...prev.addons,
              bus: false,
              train: false
            }
          }));
        } else {
          setTransportError('');
        }
        
        fetchWeather(details.name);
      }
    } else {
      setDestinationError('');
      setDestinationSuggestions([]);
      setIsInternational(false);
    }
  }, [formData.destination]);

  useEffect(() => {
    if (formData.addons.flight && flightData.from && flightData.to && flightData.departureDate) {
      fetchFlights();
    }
  }, [flightData.from, flightData.to, flightData.departureDate, flightData.returnDate, flightData.class]);

  useEffect(() => {
    if (formData.addons.hotel && formData.destination && hotelData.checkIn && hotelData.checkOut) {
      fetchHotels();
    }
  }, [formData.destination, hotelData.checkIn, hotelData.checkOut, hotelData.budget, hotelData.starRating]);

  useEffect(() => {
    if (formData.addons.car && formData.destination && carData.pickupDate) {
      fetchCars();
    }
  }, [formData.destination, carData.pickupDate, carData.dropoffDate, carData.carType]);

  // Fetch available trains when train search criteria changes
  useEffect(() => {
    if (formData.addons.train && trainData.from && trainData.to && trainData.travelDate) {
      if (isInternational) {
        setTransportError('Train not available for international destinations');
        return;
      }
      fetchTrains();
    }
  }, [trainData.from, trainData.to, trainData.travelDate, trainData.class, isInternational]);

  // Fetch available buses when bus search criteria changes
  useEffect(() => {
    if (formData.addons.bus && busData.from && busData.to && busData.travelDate) {
      if (isInternational) {
        setTransportError('Bus not available for international destinations');
        return;
      }
      fetchBuses();
    }
  }, [busData.from, busData.to, busData.travelDate, busData.busType, isInternational]);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Default to New Delhi if location access is denied
          setUserLocation({ lat: 28.6139, lng: 77.2090 });
        }
      );
    } else {
      setUserLocation({ lat: 28.6139, lng: 77.2090 });
    }
  }, []);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=2672d3ffdd61ff2ed7f7f733ed16e0e8`
      );
      setWeather(response.data);
    } catch (error) {
      console.error("Error fetching weather:", error);
      // Fallback dummy data
      setWeather({
        weather: [{ description: "Weather data not available" }],
        main: { temp: 'N/A', humidity: 'N/A' },
        wind: { speed: 'N/A' }
      });
    }
  };

  const fetchFlights = async () => {
    // In a real app, this would be an API call
    const dummyFlights = [
      {
        id: 1,
        airline: "IndiGo",
        flightNumber: "6E-123",
        departure: "08:00",
        arrival: "10:30",
        duration: "2h 30m",
        price: isInternational ? 15000 : 5000,
        seatsAvailable: 20
      },
      {
        id: 2,
        airline: isInternational ? "Emirates" : "Air India",
        flightNumber: isInternational ? "EK-456" : "AI-456",
        departure: "12:00",
        arrival: isInternational ? "15:15" : "14:15",
        duration: isInternational ? "3h 15m" : "2h 15m",
        price: isInternational ? 25000 : 6500,
        seatsAvailable: 15
      },
      {
        id: 3,
        airline: isInternational ? "Singapore Airlines" : "Vistara",
        flightNumber: isInternational ? "SQ-789" : "UK-789",
        departure: "16:30",
        arrival: isInternational ? "20:00" : "19:00",
        duration: isInternational ? "3h 30m" : "2h 30m",
        price: isInternational ? 30000 : 7500,
        seatsAvailable: 10
      }
    ];
    setFlightData(prev => ({ ...prev, availableFlights: dummyFlights }));
  };

  const fetchHotels = async () => {
    const dummyHotels = [
      {
        id: 1,
        name: `${destinationDetails?.name || formData.destination} Grand Hotel`,
        rating: 4,
        price: isInternational ? 10000 : 3500,
        amenities: ["Pool", "Spa", "Restaurant"],
        roomsAvailable: 10
      },
      {
        id: 2,
        name: `${destinationDetails?.name || formData.destination} Plaza`,
        rating: 3,
        price: isInternational ? 7000 : 2500,
        amenities: ["Restaurant", "WiFi"],
        roomsAvailable: 15
      },
      {
        id: 3,
        name: `${destinationDetails?.name || formData.destination} Budget Inn`,
        rating: 2,
        price: isInternational ? 4000 : 1500,
        amenities: ["WiFi"],
        roomsAvailable: 20
      }
    ];
    setHotelData(prev => ({ ...prev, availableHotels: dummyHotels }));
  };

  const fetchCars = async () => {
    const dummyCars = [
      {
        id: 1,
        model: "Toyota Innova",
        type: "6-seater",
        price: 2000,
        available: true
      },
      {
        id: 2,
        model: "Maruti Suzuki Swift",
        type: "4-seater",
        price: 1500,
        available: true
      },
      {
        id: 3,
        model: "Hyundai Creta",
        type: "5-seater",
        price: 1800,
        available: true
      }
    ];
    setCarData(prev => ({ ...prev, availableCars: dummyCars }));
  };

  const fetchTrains = async () => {
    const dummyTrains = [
      {
        id: 1,
        name: "Rajdhani Express",
        number: "12345",
        departure: "08:00",
        arrival: "16:00",
        duration: "8h",
        price: 1200,
        seatsAvailable: 50
      },
      {
        id: 2,
        name: "Shatabdi Express",
        number: "54321",
        departure: "14:00",
        arrival: "20:30",
        duration: "6h 30m",
        price: 1500,
        seatsAvailable: 40
      }
    ];
    setTrainData(prev => ({ ...prev, availableTrains: dummyTrains }));
  };

  const fetchBuses = async () => {
    const dummyBuses = [
      {
        id: 1,
        operator: "Sharma Travels",
        busNumber: "SH-101",
        departure: "21:00",
        arrival: "06:00",
        duration: "9h",
        price: 800,
        seatsAvailable: 30
      },
      {
        id: 2,
        operator: "Verma Travels",
        busNumber: "VM-202",
        departure: "22:30",
        arrival: "07:30",
        duration: "9h",
        price: 950,
        seatsAvailable: 25
      }
    ];
    setBusData(prev => ({ ...prev, availableBuses: dummyBuses }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTravelerInfoChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      travelerInfo: {
        ...prev.travelerInfo,
        [name]: value
      }
    }));
  };

  const handleAddonChange = (e) => {
    const { name, checked } = e.target;
    
    // Check if trying to enable bus/train for international destination
    if ((name === 'bus' || name === 'train') && checked && isInternational) {
      setTransportError(`For international destinations like ${destinationDetails?.name || formData.destination}, ${name} is not available`);
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      addons: {
        ...prev.addons,
        [name]: checked
      }
    }));
    
    // Clear transport error if disabling the option
    if ((name === 'bus' || name === 'train') && !checked) {
      setTransportError('');
    }
  };

  const handleFlightInputChange = (e) => {
    const { name, value } = e.target;
    setFlightData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleHotelInputChange = (e) => {
    const { name, value } = e.target;
    setHotelData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCarInputChange = (e) => {
    const { name, value } = e.target;
    setCarData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTrainInputChange = (e) => {
    const { name, value } = e.target;
    setTrainData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBusInputChange = (e) => {
    const { name, value } = e.target;
    setBusData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const selectFlight = (flight) => {
    setFlightData(prev => ({ ...prev, selectedFlight: flight }));
  };

  const selectHotel = (hotel) => {
    setHotelData(prev => ({ ...prev, selectedHotel: hotel }));
  };

  const selectCar = (car) => {
    setCarData(prev => ({ ...prev, selectedCar: car }));
  };

  const selectTrain = (train) => {
    setTrainData(prev => ({ ...prev, selectedTrain: train }));
  };

  const selectBus = (bus) => {
    setBusData(prev => ({ ...prev, selectedBus: bus }));
  };

  const selectSuggestion = (destination) => {
    setFormData(prev => ({
      ...prev,
      destination: destination.name
    }));
    setDestinationSuggestions([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate destination
    const normalizedInput = formData.destination.toLowerCase().replace(/\s+/g, '-');
    if (!ALL_DESTINATIONS.includes(normalizedInput)) {
      setDestinationError('Please select a valid destination from the suggestions');
      return;
    }
    
    // Validate international destinations with bus/train
    if (isInternational && (formData.addons.bus || formData.addons.train)) {
      setTransportError('Cannot book bus/train for international destinations');
      setCurrentStep(1); // Go back to first step
      return;
    }
    
    // Generate Razorpay order
    await initPayment();
  };

  const initPayment = () => {
    const options = {
      key: "rzp_test_yP3BDk7SSyJpG2",
      amount: payment.amount * 100,
      currency: "INR",
      name: "Travel Booking",
      description: "Tour Package Payment",
      order_id: payment.razorpayOrderId,
      handler: async (response) => {
        try {
          // In a real app, you would verify payment on your backend
          const bookingData = {
            ...formData,
            flightData,
            hotelData,
            carData,
            trainData,
            busData,
            location: userLocation,
            destinationDetails,
            payment: {
              ...payment,
              status: 'completed',
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature
            },
            bookingId: `BOOK-${Math.random().toString(36).substr(2, 8).toUpperCase()}`
          };

          // Send booking data to the backend
          await axios.post('http://localhost:5000/api/bookings', bookingData);

          setPayment(prev => ({
            ...prev,
            status: 'completed',
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature
          }));
          
          generateReceipt();

          addBooking(bookingData);
        } catch (err) {
          console.error('Error processing booking:', err);
        }
      },
      theme: {
        color: "#3399cc"
      }
    };
    
    const orderId = `order_${Math.random().toString(36).substr(2, 9)}`;
    setPayment(prev => ({ ...prev, razorpayOrderId: orderId }));
    
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const generateReceipt = () => {
    const receipt = {
      bookingId: `BOOK-${Math.random().toString(36).substr(2, 8).toUpperCase()}`,
      date: new Date().toLocaleDateString(),
      traveler: formData.travelerInfo.name,
      destination: destinationDetails?.name || formData.destination,
      country: destinationDetails?.country || 'India',
      package: formData.packageType,
      duration: `${formData.duration} days`,
      travelers: formData.travelers,
      totalAmount: payment.amount,
      flight: formData.addons.flight ? flightData.selectedFlight : null,
      hotel: formData.addons.hotel ? hotelData.selectedHotel : null,
      car: formData.addons.car ? carData.selectedCar : null,
      train: formData.addons.train ? trainData.selectedTrain : null,
      bus: formData.addons.bus ? busData.selectedBus : null
    };
    
    setPayment(prev => ({ ...prev, receipt }));
    setShowReceipt(true);
  };

  const nextStep = () => {
    // Validate destination before proceeding
    if (currentStep === 1) {
      const normalizedInput = formData.destination.toLowerCase().replace(/\s+/g, '-');
      if (!ALL_DESTINATIONS.includes(normalizedInput)) {
        setDestinationError('Please select a valid destination from the suggestions');
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };
  
  const prevStep = () => setCurrentStep(prev => prev - 1);

  const renderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <div className="booking-step">
            <h2>Destination & Dates</h2>
            <div className="form-group">
              <label>Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                required
                placeholder="Enter a city or destination"
              />
              {destinationError && <div className="error-message">{destinationError}</div>}
              
              {destinationSuggestions.length > 0 && (
                <div className="suggestions">
                  {destinationSuggestions.map(dest => (
                    <div 
                      key={dest.id}
                      className="suggestion-item"
                      onClick={() => selectSuggestion(dest)}
                    >
                      {dest.name}, {dest.country} ({dest.type})
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {destinationDetails && (
              <div className="destination-info">
                <h3>{destinationDetails.name}, {destinationDetails.country}</h3>
                <p>Type: {destinationDetails.type}</p>
                {isInternational && <p className="international-badge">International Destination</p>}
              </div>
            )}
            
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                required
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                required
                min={formData.startDate || new Date().toISOString().split('T')[0]}
              />
            </div>
            
            {weather && (
              <div className="weather-info">
                <h3>Weather in {destinationDetails?.name || formData.destination}</h3>
                <p>Condition: {weather.weather[0].description}</p>
                <p>Temperature: {weather.main.temp}°C</p>
                <p>Humidity: {weather.main.humidity}%</p>
                <p>Wind Speed: {weather.wind.speed} m/s</p>
              </div>
            )}
            
            <div className="form-group">
              <label>Package Type</label>
              <select
                name="packageType"
                value={formData.packageType}
                onChange={handleInputChange}
              >
                <option value="Family">Family Package</option>
                <option value="Honeymoon">Honeymoon Package</option>
                <option value="Adventure">Adventure Package</option>
                <option value="Budget">Budget Package</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Duration (days)</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                min="1"
              />
            </div>
            
            <div className="form-group">
              <label>Number of Travelers</label>
              <input
                type="number"
                name="travelers"
                value={formData.travelers}
                onChange={handleInputChange}
                min="1"
              />
            </div>
            
            <div className="addons">
              <h3>Add-on Services</h3>
              
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="flight"
                  checked={formData.addons.flight}
                  onChange={handleAddonChange}
                />
                Flight Booking
              </label>
              
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="hotel"
                  checked={formData.addons.hotel}
                  onChange={handleAddonChange}
                />
                Hotel Booking
              </label>
              
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="car"
                  checked={formData.addons.car}
                  onChange={handleAddonChange}
                />
                Car Rental
              </label>
              
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="train"
                  checked={formData.addons.train}
                  onChange={handleAddonChange}
                  disabled={isInternational}
                />
                Train Booking
                {isInternational && 
                  <span className="disabled-note"> (Not available for international destinations)</span>}
              </label>

              <label className="checkbox">
                <input
                  type="checkbox"
                  name="bus"
                  checked={formData.addons.bus}
                  onChange={handleAddonChange}
                  disabled={isInternational}
                />
                Bus Booking
                {isInternational && 
                  <span className="disabled-note"> (Not available for international destinations)</span>}
              </label>

              <label className="checkbox">
                <input
                  type="checkbox"
                  name="guide"
                  checked={formData.addons.guide}
                  onChange={handleAddonChange}
                />
                Guide Booking
              </label>
            </div>
            
            {transportError && <div className="error-message">{transportError}</div>}
            
            <button 
              type="button" 
              onClick={nextStep} 
              className="next-btn" 
              style={{width:'25%'}}
              disabled={!formData.destination || !formData.startDate || !formData.endDate}
            >
              Next
            </button>
          </div>
        );
      
      case 2:
        return (
          <div className="booking-step">
            <h2>Add-on Services Details</h2>
            
            {formData.addons.flight && (
              <div className="addon-section">
                <h3>Flight Booking</h3>
                
                <div className="form-group">
                  <label>From</label>
                  <input
                    type="text"
                    name="from"
                    value={flightData.from}
                    onChange={handleFlightInputChange}
                    required
                    placeholder="City or airport code"
                  />
                </div>
                
                <div className="form-group">
                  <label>To</label>
                  <input
                    type="text"
                    name="to"
                    value={flightData.to}
                    onChange={handleFlightInputChange}
                    required
                    placeholder="City or airport code"
                  />
                </div>
                
                <div className="form-group">
                  <label>Departure Date</label>
                  <input
                    type="date"
                    name="departureDate"
                    value={flightData.departureDate}
                    onChange={handleFlightInputChange}
                    required
                    min={formData.startDate}
                  />
                </div>
                
                <div className="form-group">
                  <label>Return Date (if round trip)</label>
                  <input
                    type="date"
                    name="returnDate"
                    value={flightData.returnDate}
                    onChange={handleFlightInputChange}
                    min={flightData.departureDate}
                  />
                </div>
                
                <div className="form-group">
                  <label>Passengers</label>
                  <input
                    type="number"
                    name="passengers"
                    value={flightData.passengers}
                    onChange={handleFlightInputChange}
                    min="1"
                    max={formData.travelers}
                  />
                </div>
                
                <div className="form-group">
                  <label>Class</label>
                  <select
                    name="class"
                    value={flightData.class}
                    onChange={handleFlightInputChange}
                  >
                    <option value="Economy">Economy</option>
                    <option value="Business">Business</option>
                    <option value="First">First Class</option>
                  </select>
                </div>
                
                {flightData.availableFlights.length > 0 && (
                  <div className="flight-options">
                    <h4>Available Flights</h4>
                    {flightData.availableFlights.map(flight => (
                      <div 
                        key={flight.id} 
                        className={`flight-option ${flightData.selectedFlight?.id === flight.id ? 'selected' : ''}`}
                        onClick={() => selectFlight(flight)}
                      >
                        <div className="flight-airline">{flight.airline}</div>
                        <div className="flight-number">{flight.flightNumber}</div>
                        <div className="flight-time">
                          {flight.departure} - {flight.arrival} ({flight.duration})
                        </div>
                        <div className="flight-price">₹{flight.price}</div>
                        <div className="flight-seats">{flight.seatsAvailable} seats left</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {formData.addons.hotel && (
              <div className="addon-section">
                <h3>Hotel Booking</h3>
                
                <div className="form-group">
                  <label>Check-in Date</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={hotelData.checkIn}
                    onChange={handleHotelInputChange}
                    required
                    min={formData.startDate}
                  />
                </div>
                
                <div className="form-group">
                  <label>Check-out Date</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={hotelData.checkOut}
                    onChange={handleHotelInputChange}
                    required
                    min={hotelData.checkIn || formData.startDate}
                  />
                </div>
                
                <div className="form-group">
                  <label>Guests</label>
                  <input
                    type="number"
                    name="guests"
                    value={hotelData.guests}
                    onChange={handleHotelInputChange}
                    min="1"
                    max={formData.travelers}
                  />
                </div>
                
                <div className="form-group">
                  <label>Budget</label>
                  <select
                    name="budget"
                    value={hotelData.budget}
                    onChange={handleHotelInputChange}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Star Rating</label>
                  <select
                    name="starRating"
                    value={hotelData.starRating}
                    onChange={handleHotelInputChange}
                  >
                    <option value="1">1 Star</option>
                    <option value="2">2 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="5">5 Stars</option>
                  </select>
                </div>
                
                {hotelData.availableHotels.length > 0 && (
                  <div className="hotel-options">
                    <h4>Available Hotels</h4>
                    {hotelData.availableHotels.map(hotel => (
                      <div 
                        key={hotel.id} 
                        className={`hotel-option ${hotelData.selectedHotel?.id === hotel.id ? 'selected' : ''}`}
                        onClick={() => selectHotel(hotel)}
                      >
                        <div className="hotel-name">{hotel.name}</div>
                        <div className="hotel-rating">{"★".repeat(hotel.rating)}</div>
                        <div className="hotel-price">₹{hotel.price}/night</div>
                        <div className="hotel-amenities">
                          {hotel.amenities.join(", ")}
                        </div>
                        <div className="hotel-rooms">{hotel.roomsAvailable} rooms left</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {formData.addons.car && (
              <div className="addon-section">
                <h3>Car Rental</h3>
                
                <div className="form-group">
                  <label>Pickup Date</label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={carData.pickupDate}
                    onChange={handleCarInputChange}
                    required
                    min={formData.startDate}
                  />
                </div>
                
                <div className="form-group">
                  <label>Drop-off Date</label>
                  <input
                    type="date"
                    name="dropoffDate"
                    value={carData.dropoffDate}
                    onChange={handleCarInputChange}
                    required
                    min={carData.pickupDate || formData.startDate}
                  />
                </div>
                
                <div className="form-group">
                  <label>Car Type</label>
                  <select
                    name="carType"
                    value={carData.carType}
                    onChange={handleCarInputChange}
                  >
                    <option value="4-seater">4-seater</option>
                    <option value="6-seater">6-seater</option>
                    <option value="SUV">SUV</option>
                    <option value="Luxury">Luxury</option>
                  </select>
                </div>
                
                {carData.availableCars.length > 0 && (
                  <div className="car-options">
                    <h4>Available Cars</h4>
                    {carData.availableCars.map(car => (
                      <div 
                        key={car.id} 
                        className={`car-option ${carData.selectedCar?.id === car.id ? 'selected' : ''}`}
                        onClick={() => selectCar(car)}
                      >
                        <div className="car-model">{car.model}</div>
                        <div className="car-type">{car.type}</div>
                        <div className="car-price">₹{car.price}/day</div>
                        <div className="car-availability">
                          {car.available ? "Available" : "Not Available"}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {formData.addons.train && (
              <div className="addon-section">
                <h3>Train Booking</h3>
                
                <div className="form-group">
                  <label>From</label>
                  <input
                    type="text"
                    name="from"
                    value={trainData.from}
                    onChange={handleTrainInputChange}
                    required
                    placeholder="City or station name"
                  />
                </div>
                
                <div className="form-group">
                  <label>To</label>
                  <input
                    type="text"
                    name="to"
                    value={trainData.to}
                    onChange={handleTrainInputChange}
                    required
                    placeholder="City or station name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Travel Date</label>
                  <input
                    type="date"
                    name="travelDate"
                    value={trainData.travelDate}
                    onChange={handleTrainInputChange}
                    required
                    min={formData.startDate}
                  />
                </div>
                
                <div className="form-group">
                  <label>Passengers</label>
                  <input
                    type="number"
                    name="passengers"
                    value={trainData.passengers}
                    onChange={handleTrainInputChange}
                    min="1"
                    max={formData.travelers}
                  />
                </div>
                
                <div className="form-group">
                  <label>Class</label>
                  <select
                    name="class"
                    value={trainData.class}
                    onChange={handleTrainInputChange}
                  >
                    <option value="Sleeper">Sleeper</option>
                    <option value="3A">AC 3-Tier</option>
                    <option value="2A">AC 2-Tier</option>
                    <option value="1A">AC First Class</option>
                  </select>
                </div>
                
                {trainData.availableTrains.length > 0 && (
                  <div className="train-options">
                    <h4>Available Trains</h4>
                    {trainData.availableTrains.map(train => (
                      <div 
                        key={train.id} 
                        className={`train-option ${trainData.selectedTrain?.id === train.id ? 'selected' : ''}`}
                        onClick={() => selectTrain(train)}
                      >
                        <div className="train-name">{train.name}</div>
                        <div className="train-number">{train.number}</div>
                        <div className="train-time">
                          {train.departure} - {train.arrival} ({train.duration})
                        </div>
                        <div className="train-price">₹{train.price}</div>
                        <div className="train-seats">{train.seatsAvailable} seats left</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {formData.addons.bus && (
              <div className="addon-section">
                <h3>Bus Booking</h3>
                
                <div className="form-group">
                  <label>From</label>
                  <input
                    type="text"
                    name="from"
                    value={busData.from}
                    onChange={handleBusInputChange}
                    required
                    placeholder="City or bus stand name"
                  />
                </div>
                
                <div className="form-group">
                  <label>To</label>
                  <input
                    type="text"
                    name="to"
                    value={busData.to}
                    onChange={handleBusInputChange}
                    required
                    placeholder="City or bus stand name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Travel Date</label>
                  <input
                    type="date"
                    name="travelDate"
                    value={busData.travelDate}
                    onChange={handleBusInputChange}
                    required
                    min={formData.startDate}
                  />
                </div>
                
                <div className="form-group">
                  <label>Passengers</label>
                  <input
                    type="number"
                    name="passengers"
                    value={busData.passengers}
                    onChange={handleBusInputChange}
                    min="1"
                    max={formData.travelers}
                  />
                </div>
                
                <div className="form-group">
                  <label>Bus Type</label>
                  <select
                    name="busType"
                    value={busData.busType}
                    onChange={handleBusInputChange}
                  >
                    <option value="Seater">Seater</option>
                    <option value="Sleeper">Sleeper</option>
                  </select>
                </div>
                
                {busData.availableBuses.length > 0 && (
                  <div className="bus-options">
                    <h4>Available Buses</h4>
                    {busData.availableBuses.map(bus => (
                      <div 
                        key={bus.id} 
                        className={`bus-option ${busData.selectedBus?.id === bus.id ? 'selected' : ''}`}
                        onClick={() => selectBus(bus)}
                      >
                        <div className="bus-operator">{bus.operator}</div>
                        <div className="bus-number">{bus.busNumber}</div>
                        <div className="bus-time">
                          {bus.departure} - {bus.arrival} ({bus.duration})
                        </div>
                        <div className="bus-price">₹{bus.price}</div>
                        <div className="bus-seats">{bus.seatsAvailable} seats left</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            <div className="navigation-buttons">
              <button type="button" onClick={prevStep} className="prev-btn" style={{width:"40%"}}>
                Previous
              </button>
              <button 
                type="button" 
                onClick={nextStep} 
                className="next-btn" 
                style={{width:"40%"}}
                disabled={
                  (formData.addons.flight && !flightData.selectedFlight) ||
                  (formData.addons.hotel && !hotelData.selectedHotel) ||
                  (formData.addons.car && !carData.selectedCar) ||
                  (formData.addons.train && !trainData.selectedTrain) ||
                  (formData.addons.bus && !busData.selectedBus)
                }
              >
                Next
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="booking-step">
            <h2>Traveler Information</h2>
            
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.travelerInfo.name}
                onChange={handleTravelerInfoChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.travelerInfo.email}
                onChange={handleTravelerInfoChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.travelerInfo.phone}
                onChange={handleTravelerInfoChange}
                required
                pattern="[0-9]{10}"
                title="Please enter a 10-digit phone number"
              />
            </div>
            
            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                value={formData.travelerInfo.address}
                onChange={handleTravelerInfoChange}
                required
              />
            </div>

            <div className="form-group">
              <label>ID Proof Type</label>
              <select
                name="idType"
                value={formData.travelerInfo.idType}
                onChange={handleTravelerInfoChange}
              >
                <option value="Aadhar Card">Aadhar Card</option>
                <option value="Passport">Passport</option>
                <option value="Visa">Visa</option>
                <option value="PAN Card">PAN Card</option>
              </select>
            </div>

            <div className="form-group">
              <label>ID Proof Number</label>
              <input
                type="text"
                name="idNumber"
                value={formData.travelerInfo.idNumber}
                onChange={handleTravelerInfoChange}
                required
              />
            </div>
            
            <div className="payment-summary">
              <h3>Payment Summary</h3>
              <div className="summary-item">
                <span>Package:</span>
                <span>{formData.packageType} (₹{formData.packageType === 'Family' ? 500 * formData.travelers : 
                  formData.packageType === 'Honeymoon' ? 800 * 2 : 
                  formData.packageType === 'Adventure' ? 600 * formData.travelers : 
                  300 * formData.travelers})</span>
              </div>
              
              {formData.addons.flight && flightData.selectedFlight && (
                <div className="summary-item">
                  <span>Flight:</span>
                  <span>{flightData.selectedFlight.airline} (₹{flightData.selectedFlight.price * flightData.passengers})</span>
                </div>
              )}
              
              {formData.addons.hotel && hotelData.selectedHotel && (
                <div className="summary-item">
                  <span>Hotel:</span>
                  <span>{hotelData.selectedHotel.name} (₹{
                    hotelData.selectedHotel.price * 
                    Math.ceil((new Date(hotelData.checkOut) - new Date(hotelData.checkIn)) / (1000 * 60 * 60 * 24))
                  })</span>
                </div>
              )}
              
              {formData.addons.car && carData.selectedCar && (
                <div className="summary-item">
                  <span>Car:</span>
                  <span>{carData.selectedCar.model} (₹{
                    carData.selectedCar.price * 
                    Math.ceil((new Date(carData.dropoffDate) - new Date(carData.pickupDate)) / (1000 * 60 * 60 * 24))
                  })</span>
                </div>
              )}
              
              {formData.addons.train && trainData.selectedTrain && (
                <div className="summary-item">
                  <span>Train:</span>
                  <span>{trainData.selectedTrain.name} (₹{trainData.selectedTrain.price * trainData.passengers})</span>
                </div>
              )}

              {formData.addons.bus && busData.selectedBus && (
                <div className="summary-item">
                  <span>Bus:</span>
                  <span>{busData.selectedBus.operator} (₹{busData.selectedBus.price * busData.passengers})</span>
                </div>
              )}
              
              <div className="summary-total">
                <span>Total:</span>
                <span>₹{payment.amount}</span>
              </div>
            </div>
            
            {transportError && <div className="error-message">{transportError}</div>}
            
            <div className="navigation-buttons">
              <button type="button" onClick={prevStep} className="prev-btn"  style={{width:"35%"}}>
                Previous
              </button>
              <button 
                type="submit" 
                className="submit-btn" 
                style={{width:"35%"}}
                disabled={
                  !formData.travelerInfo.name ||
                  !formData.travelerInfo.email ||
                  !formData.travelerInfo.phone ||
                  !formData.travelerInfo.address ||
                  !formData.travelerInfo.idNumber
                }
              >
                Confirm Booking
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderReceipt = () => {
    if (!payment.receipt) return null;
    
    return (
      <div className="receipt">
        <h2>Booking Confirmed!</h2>
        <div className="receipt-id">Booking ID: {payment.receipt.bookingId}</div>
        <div className="receipt-date">Date: {payment.receipt.date}</div>
        
        <div className="receipt-section">
          <h3>Traveler Information</h3>
          <div className="info-item">
            <span>Name:</span>
            <span>{formData.travelerInfo.name}</span>
          </div>
          <div className="info-item">
            <span>Email:</span>
            <span>{formData.travelerInfo.email}</span>
          </div>
          <div className="info-item">
            <span>Phone:</span>
            <span>{formData.travelerInfo.phone}</span>
          </div>
          <div className="info-item">
            <span>ID Proof:</span>
            <span>{formData.travelerInfo.idType} - {formData.travelerInfo.idNumber}</span>
          </div>
        </div>
        
        <div className="receipt-section">
          <h3>Package Details</h3>
          <div className="info-item">
            <span>Destination:</span>
            <span>{payment.receipt.destination}, {payment.receipt.country}</span>
          </div>
          <div className="info-item">
            <span>Package Type:</span>
            <span>{payment.receipt.package}</span>
          </div>
          <div className="info-item">
            <span>Duration:</span>
            <span>{payment.receipt.duration}</span>
          </div>
          <div className="info-item">
            <span>Travelers:</span>
            <span>{payment.receipt.travelers}</span>
          </div>
        </div>
        
        {formData.addons.flight && payment.receipt.flight && (
          <div className="receipt-section">
            <h3>Flight Ticket</h3>
            <div className="ticket">
              <div className="ticket-header">
                <div className="airline">{payment.receipt.flight.airline}</div>
                <div className="flight-number">{payment.receipt.flight.flightNumber}</div>
              </div>
              <div className="ticket-body">
                <div className="from-to">
                  <div className="departure">
                    <div className="city">{flightData.from}</div>
                    <div className="time">{payment.receipt.flight.departure}</div>
                  </div>
                  <div className="arrow">→</div>
                  <div className="arrival">
                    <div className="city">{flightData.to}</div>
                    <div className="time">{payment.receipt.flight.arrival}</div>
                  </div>
                </div>
                <div className="passenger">
                  Passenger: {formData.travelerInfo.name}
                </div>
                <div className="ticket-footer">
                  <div className="barcode">
                    <QRCode 
                      value={`FLIGHT-${payment.receipt.bookingId}`} 
                      size={80} 
                    />
                  </div>
                  <div className="price">
                    Price: ₹{payment.receipt.flight.price}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {formData.addons.hotel && payment.receipt.hotel && (
          <div className="receipt-section">
            <h3>Hotel Booking</h3>
            <div className="info-item">
              <span>Hotel:</span>
              <span>{payment.receipt.hotel.name}</span>
            </div>
            <div className="info-item">
              <span>Check-in:</span>
              <span>{hotelData.checkIn}</span>
            </div>
            <div className="info-item">
              <span>Check-out:</span>
              <span>{hotelData.checkOut}</span>
            </div>
            <div className="info-item">
              <span>Guests:</span>
              <span>{hotelData.guests}</span>
            </div>
            <div className="info-item">
              <span>Price:</span>
              <span>₹{payment.receipt.hotel.price}</span>
            </div>
          </div>
        )}
        
        {formData.addons.car && payment.receipt.car && (
          <div className="receipt-section">
            <h3>Car Rental</h3>
            <div className="info-item">
              <span>Car Model:</span>
              <span>{payment.receipt.car.model}</span>
            </div>
            <div className="info-item">
              <span>Type:</span>
              <span>{payment.receipt.car.type}</span>
            </div>
            <div className="info-item">
              <span>Pickup:</span>
              <span>{carData.pickupDate}</span>
            </div>
            <div className="info-item">
              <span>Drop-off:</span>
              <span>{carData.dropoffDate}</span>
            </div>
            <div className="info-item">
              <span>Price:</span>
              <span>₹{payment.receipt.car.price}</span>
            </div>
          </div>
        )}
        
        {formData.addons.train && payment.receipt.train && (
          <div className="receipt-section">
            <h3>Train Ticket</h3>
            <div className="ticket">
              <div className="ticket-header">
                <div className="train-name">{payment.receipt.train.name}</div>
                <div className="train-number">{payment.receipt.train.number}</div>
              </div>
              <div className="ticket-body">
                <div className="from-to">
                  <div className="departure">
                    <div className="city">{trainData.from}</div>
                    <div className="time">{payment.receipt.train.departure}</div>
                  </div>
                  <div className="arrow">→</div>
                  <div className="arrival">
                    <div className="city">{trainData.to}</div>
                    <div className="time">{payment.receipt.train.arrival}</div>
                  </div>
                </div>
                <div className="passenger">
                  Passenger: {formData.travelerInfo.name}
                </div>
                <div className="ticket-footer">
                  <div className="barcode">
                    <QRCode 
                      value={`TRAIN-${payment.receipt.bookingId}`} 
                      size={80} 
                    />
                  </div>
                  <div className="price">
                    Price: ₹{payment.receipt.train.price}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {formData.addons.bus && payment.receipt.bus && (
          <div className="receipt-section">
            <h3>Bus Ticket</h3>
            <div className="ticket">
              <div className="ticket-header">
                <div className="bus-operator">{payment.receipt.bus.operator}</div>
                <div className="bus-number">{payment.receipt.bus.busNumber}</div>
              </div>
              <div className="ticket-body">
                <div className="from-to">
                  <div className="departure">
                    <div className="city">{busData.from}</div>
                    <div className="time">{payment.receipt.bus.departure}</div>
                  </div>
                  <div className="arrow">→</div>
                  <div className="arrival">
                    <div className="city">{busData.to}</div>
                    <div className="time">{payment.receipt.bus.arrival}</div>
                  </div>
                </div>
                <div className="passenger">
                  Passenger: {formData.travelerInfo.name}
                </div>
                <div className="ticket-footer">
                  <div className="barcode">
                    <QRCode 
                      value={`BUS-${payment.receipt.bookingId}`} 
                      size={80} 
                    />
                  </div>
                  <div className="price">
                    Price: ₹{payment.receipt.bus.price}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="receipt-section total">
          <h3>Payment Summary</h3>
          <div className="info-item">
            <span>Total Amount:</span>
            <span>₹{payment.receipt.totalAmount}</span>
          </div>
          <div className="info-item">
            <span>Payment Status:</span>
            <span>{payment.status === 'completed' ? 'Paid' : 'Pending'}</span>
          </div>
          {payment.razorpayPaymentId && (
            <div className="info-item">
              <span>Transaction ID:</span>
              <span>{payment.razorpayPaymentId}</span>
            </div>
          )}
        </div>
        
        <button 
          className="print-btn" 
          onClick={() => window.print()}
        >
          Print Receipt
        </button>
      </div>
    );
  };

  return (
    <div className="booking-container">
      {!showReceipt ? (
        <form onSubmit={handleSubmit}>
          <div className="booking-header">
            <h1>Book Your Travel Package</h1>
            <div className="progress-bar">
              <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
                <span>1</span>
                <p>Package Details</p>
              </div>
              <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
                <span>2</span>
                <p>Add-ons</p>
              </div>
              <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
                <span>3</span>
                <p>Traveler Info</p>
              </div>
            </div>
          </div>
          
          {renderStep()}
        </form>
      ) : (
        renderReceipt()
      )}
    </div>
  );
};

export default Booking;