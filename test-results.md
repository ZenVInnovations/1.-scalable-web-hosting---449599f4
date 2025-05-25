# Performance test results

<P>
Brief description of the used server (choose one): HTTP/1.1 / HTTP/2
</P>

* Used server -> HTTP/1.1, localhost (127.0.0.1) port 7777

<P>
Brief description of your computer:
</P>

* Chip Apple M1 Max
* Memory 64GB
* macOS Sonoma 14.1

## No database

### Retrieving todos

http_reqs: 756379
http_req_duration - median: 103µs
http_req_duration - 99th percentile: 351µs

### Posting todos

http_reqs: 576095
http_req_duration - median: 141µs
http_req_duration - 99th percentile: 465µs

## With database

### Retrieving todos

http_reqs: 127
http_req_duration - median: 805.29ms
http_req_duration - 99th percentile: 1.46s

### Posting todos

http_reqs: 4220
http_req_duration - median: 21.03ms
http_req_duration - 99th percentile: 42.51ms

## Reflection

Brief reflection on the results of the tests -- why do you think you saw the results you saw:

<p>
When using DB version of app the amount of https requests is lower and duration higher compared to NO DB version, because of more initial rows in DB and distance (remote connection to DB). There was about 4k rows to fetch as I first posted the data. Also using DB the requests are sent to the remote server (ElephantSQL) locating in Stockholm. No DB version retrieving of todos was tested to empty list so the number of request are high.
<p>
