# Read /proc/stat file (for first datapoint)
read cpu user nice system idle iowait irq softirq steal guest< /proc/stat

# compute active and total utilizations
cpu_active_prev=$((user+system+nice+softirq+steal))
cpu_total_prev=$((user+system+nice+softirq+steal+idle+iowait))

sleep 0.1

# Read /proc/stat file (for second datapoint)
read cpu user nice system idle iowait irq softirq steal guest< /proc/stat

# compute active and total utilizations
cpu_active_cur=$((user+system+nice+softirq+steal))
cpu_total_cur=$((user+system+nice+softirq+steal+idle+iowait))

# compute CPU utilization (%)
cpu_util=$((100*( cpu_active_cur-cpu_active_prev ) / (cpu_total_cur-cpu_total_prev) ))

count=0

if [ $cpu_util -gt 70 ];
then
        echo -n $count >> /monitoring/Day2/check.txt

        value=`cat /monitoring/Day2/check.txt`
        n=${#value}
        echo $n
        if [ $(($n)) -gt 2 ];
        then
                curl -X POST -H 'Content-type: application/json' --data '{"text":"J118 CPU is now ALARM: usage is over 70%"}' "https://hooks.slack.com/services/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"
                touch /monitoring/$(date +"%y%m%d-%H%M%S").txt;
                echo -n "" > /monitoring/Day2/check.txt;
        fi
else
        rm -rf /monitoring/Day2/check.txt
fi

exit 0
