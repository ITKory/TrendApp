'use client'
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
 


 
const columns_chats = [
	{
		key: "date",
		label: "DATE",
	},
	{
		key: "total",
		label: "TOTAL",
	},

];
const columns_duration = [
	{
		key: "date",
		label: "DATE",
	},
	{
		key: "agentsChattingDuration",
		label: "CHATTING DURATION",
	},
	{
		key: "count",
		label: "COUNT",
	},
	{
		key: "duration",
		label: "DURATION",
	},
];
const columns_ratings = [
	{
		key: "date",
		label: "DATE",
	},
	{
		key: "bad",
		label: "BAD",
	},
	{
		key: "chats",
		label: "CHATS",
	},
	{
		key: "good",
		label: "GOOD",
	},
];
const columns_response_time = [
	{
		key: "date",
		label: "DATE",
	},
	{
		key: "count",
		label: "COUNT",
	},
	{
		key: "responseTime",
		label: "RESPONSE TIME",
	},
];
 


 




export default function BlogPage() {

	const [chats, setChats] = useState([])
	const [durations, setDuration] = useState([])
	const [ratings, setRatings] = useState([])
	const [responseTimes, setResponseTime] = useState([])
	const [tags, setTags] = useState([])

	useEffect(() => {
		Promise.all([
			fetch('https://localhost:7252/Trend/total-chats-report'),
			fetch('https://localhost:7252/Trend/duration-report'),
			fetch('https://localhost:7252/Trend/ratings-report'),
			fetch('https://localhost:7252/Trend/response-time-report'),
			fetch('https://localhost:7252/Trend/tags-report'),
		])
			.then(([resChats, resDuration, resRatings, resResponseTime, resTags]) =>
				Promise.all([resChats.json(), resDuration.json(), resRatings.json(), resResponseTime.json(), resTags.json()]))
			.then(([dataChats, dataDuration, dataRating, dataResponseTime, dataTags]) => {
				setChats(dataChats.totalRecords);
				setDuration(dataDuration.records);
				setRatings(dataRating.records);
				setResponseTime(dataResponseTime.records);
				setTags(dataTags.records);
			});
	}, []);
	console.log(durations)

	return (
		<div className="flex w-full flex-col">
			<Tabs aria-label="Options">
				<Tab key="table" title="Table">
					<Card>
						<CardHeader>Total chats</CardHeader>

						<CardBody>
							<Table aria-label="Example table with dynamic content">
								<TableHeader columns={columns_chats}>
									{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
								</TableHeader>
								<TableBody items={chats}>
									{Object.entries(chats).map(([date, total]) => (
										<TableRow key={date}>
											{(columnKey) => <TableCell>
												{columnKey == "date" ? date : getKeyValue(total, columnKey)}
											</TableCell>}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardBody>
					</Card>
				</Tab>
				<Tab key="duration" title="Duration">
					<Card>
						<CardBody>
							<Table aria-label="Example table with dynamic content">
								<TableHeader columns={columns_duration}>
									{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
								</TableHeader>
								<TableBody items={durations}>
									{Object.keys(chats).map((key) => (
										<TableRow key={key}>
											{(columnKey) => <TableCell>   {columnKey == "date" ? key :getKeyValue(durations[key], columnKey)}</TableCell>}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardBody>
					</Card>
				</Tab>
				<Tab key="ratings" title="Ratings">
					<Card>
						<CardBody>
							<Table aria-label="Example table with dynamic content">
								<TableHeader columns={columns_ratings}>
									{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
								</TableHeader>
								<TableBody items={ratings}>
									{Object.keys(ratings).map((key) => (
										<TableRow key={key}>
											{(columnKey) => <TableCell>   { columnKey =="date"?key: getKeyValue(ratings[key], columnKey)}</TableCell>}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardBody>
					</Card>
				</Tab>
				<Tab key="time" title="Response time">
					<Card>
						<CardBody>
							<Table aria-label="Example table with dynamic content">
								<TableHeader columns={columns_response_time}>
									{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
								</TableHeader>
								<TableBody items={responseTimes}>
									{Object.keys(responseTimes).map((key) => (
										<TableRow key={key}>
											{(columnKey) => <TableCell>   {columnKey =="date"?key:getKeyValue(responseTimes[key], columnKey)}</TableCell>}
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardBody>
					</Card>
				</Tab>
				<Tab key="tags" title="Tags">
					<Card>
						<CardBody>
							<Table aria-label="Example table with dynamic content">
								<TableHeader>
									<TableColumn>DATE</TableColumn>
									<TableColumn>TAGS</TableColumn>
								</TableHeader>

								<TableBody items={tags}>
									{Object.keys(tags).map(date => (
										<TableRow key={date}>
											<TableCell>
												{date}
											</TableCell>
											{<TableCell>
												<ul className="px-5 mt-3">
													{
														Object.keys(tags[date]).map(name => (
															<li key={name}>
																{name}: {tags[date][name]}
															</li>
														))
													}
												</ul>
											</TableCell>

											}

										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardBody>
					</Card>
				</Tab>
			</Tabs>
		</div>
	);
}
